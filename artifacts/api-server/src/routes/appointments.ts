import { Router, type IRouter } from "express";
import {
  RequestAppointmentBody,
  RequestAppointmentResponse,
} from "@workspace/api-zod";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const INTERNAL_RECIPIENT = "Sales@coveandstonepools.com";
const SENDER = "Cove & Stone Pools <Sales@coveandstonepools.com>";
const UNVERIFIED_SENDER_MESSAGE =
  "We could not send your appointment request right now. Please contact Sales directly at Sales@coveandstonepools.com.";
const REQUEST_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestsByIp = new Map<string, number[]>();

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function todayInEasternTime(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isValidCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
}

function formatRequestedTime(value: string): string {
  const [hourText, minute] = value.split(":");
  const hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute} ${suffix} Eastern Time`;
}

function isRateLimited(ip: string, now: number): boolean {
  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < REQUEST_WINDOW_MS,
  );
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);
  if (requestsByIp.size > 2_000) {
    const oldestKey = requestsByIp.keys().next().value;
    if (oldestKey) requestsByIp.delete(oldestKey);
  }
  return false;
}

router.post("/appointments/request", async (req, res): Promise<void> => {
  const parsed = RequestAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid appointment request");
    res.status(400).json({ message: "Please review the appointment details and try again." });
    return;
  }

  const request = {
    fullName: parsed.data.fullName.trim().replace(/\s+/g, " "),
    address: parsed.data.address.trim(),
    phone: parsed.data.phone.trim(),
    preferredDate: parsed.data.preferredDate,
    preferredTime: parsed.data.preferredTime,
  };
  const phoneDigits = request.phone.replace(/\D/g, "");
  if (
    request.fullName.length < 2 ||
    request.address.length < 5 ||
    phoneDigits.length < 7 ||
    !isValidCalendarDate(request.preferredDate) ||
    request.preferredDate < todayInEasternTime()
  ) {
    res.status(400).json({ message: "Please enter valid contact details and a current or future date." });
    return;
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (isRateLimited(ip, Date.now())) {
    res.status(429).json({ message: "Too many appointment requests. Please try again later." });
    return;
  }

  const subjectName = request.fullName.replace(/[\r\n]/g, " ").slice(0, 120);
  const html = `
    <h1>Design consultation appointment request</h1>
    <p><strong>Name:</strong> ${escapeHtml(request.fullName)}</p>
    <p><strong>Address:</strong> ${escapeHtml(request.address)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(request.phone)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(request.preferredDate)}</p>
    <p><strong>Preferred time:</strong> ${escapeHtml(formatRequestedTime(request.preferredTime))}</p>
    <p>This is a preferred-time request, not a confirmed or reserved appointment. Please contact the customer to confirm.</p>
  `;

  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: SENDER,
        to: [INTERNAL_RECIPIENT],
        subject: `Design consultation request — ${subjectName}`,
        html,
      }),
    });

    if (!response.ok) {
      const providerMessage = await response.text();
      req.log.error(
        { providerStatus: response.status },
        "Appointment request email failed",
      );
      if (
        response.status === 403 &&
        providerMessage.toLowerCase().includes("domain") &&
        providerMessage.toLowerCase().includes("not verified")
      ) {
        res.status(502).json({ message: UNVERIFIED_SENDER_MESSAGE });
        return;
      }
      res.status(502).json({ message: "The appointment request could not be sent." });
      return;
    }

    res.status(202).json(RequestAppointmentResponse.parse({ status: "requested" }));
  } catch (error) {
    req.log.error({ err: error }, "Appointment request email failed");
    res.status(502).json({ message: "The appointment request could not be sent." });
  }
});

export default router;