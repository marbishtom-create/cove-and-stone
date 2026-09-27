import { Router, type IRouter } from "express";
import {
  SubmitContactInquiryBody,
  SubmitContactInquiryResponse,
} from "@workspace/api-zod";
import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();
const INTERNAL_RECIPIENT = "Sales@coveandstonepools.com";
const SENDER = "Cove & Stone Pools <Sales@coveandstonepools.com>";
const REQUEST_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestsByIp = new Map<string, number[]>();

type ContactEmail = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

type ContactEmailSender = (message: ContactEmail) => Promise<{
  ok: boolean;
  status: number;
}>;

function sendWithResend(message: ContactEmail) {
  return connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
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

export function createContactRouter(
  sendEmail: ContactEmailSender = sendWithResend,
): IRouter {
  const router: IRouter = Router();

  router.post("/contact/inquiry", async (req, res): Promise<void> => {
    const parsed = SubmitContactInquiryBody.safeParse(req.body);
    if (!parsed.success) {
      req.log.warn({ errors: parsed.error.message }, "Invalid contact inquiry");
      res.status(400).json({ message: "Please review the inquiry details and try again." });
      return;
    }

    const inquiry = {
      ...parsed.data,
      fullName: parsed.data.fullName.trim().replace(/\s+/g, " "),
      phone: parsed.data.phone.trim(),
      email: parsed.data.email.trim(),
      projectCity: parsed.data.projectCity.trim(),
      projectType: parsed.data.projectType.trim(),
      budget: parsed.data.budget.trim(),
      vision: parsed.data.vision.trim(),
    };
    if (
      inquiry.fullName.length < 2 ||
      inquiry.projectCity.length < 2 ||
      inquiry.vision.length > 4000 ||
      (inquiry.honeypot ?? "").trim().length > 0
    ) {
      res.status(400).json({ message: "Please review the inquiry details and try again." });
      return;
    }

    const ip = req.ip || req.socket.remoteAddress || "unknown";
    if (isRateLimited(ip, Date.now())) {
      res.status(429).json({ message: "Too many inquiries. Please try again later." });
      return;
    }

    const subjectName = inquiry.fullName.replace(/[\r\n]/g, " ").slice(0, 120);
    const html = `
    <h1>Website project inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.fullName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Project city / ZIP:</strong> ${escapeHtml(inquiry.projectCity)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(inquiry.projectType)}</p>
    <p><strong>Approximate budget:</strong> ${escapeHtml(inquiry.budget)}</p>
    <p><strong>Vision:</strong> ${escapeHtml(inquiry.vision).replace(/\r?\n/g, "<br />")}</p>
    <p><strong>Interested in financing:</strong> ${inquiry.interestedInFinancing ? "Yes" : "No"}</p>
    <p><strong>Request showroom appointment:</strong> ${inquiry.requestShowroomAppointment ? "Yes" : "No"}</p>
  `;

    try {
      const response = await sendEmail({
        from: SENDER,
        to: [INTERNAL_RECIPIENT],
        subject: `Website inquiry — ${subjectName}`,
        html,
      });
      if (!response.ok) {
        req.log.error({ providerStatus: response.status }, "Contact inquiry email failed");
        res.status(502).json({ message: "The inquiry could not be sent." });
        return;
      }
      res.status(202).json(SubmitContactInquiryResponse.parse({ status: "sent" }));
    } catch (error) {
      req.log.error({ err: error }, "Contact inquiry email failed");
      res.status(502).json({ message: "The inquiry could not be sent." });
    }
  });

  return router;
}

export default createContactRouter();