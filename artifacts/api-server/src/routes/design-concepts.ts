import { Router, type IRouter } from "express";
import { EmailDesignConceptBody } from "@workspace/api-zod";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const INTERNAL_RECIPIENT = "Sales@coveandstonepools.com";
const SENDER = "Cove & Stone Pools <Sales@coveandstonepools.com>";

const finishLabels = {
  "clear-cove": "Clear Cove",
  "deep-atlas": "Deep Atlas",
  greenstone: "Greenstone",
} as const;

const tileLabels = {
  travertine: "Warm travertine",
  "ink-line": "Ink line",
  "sea-glass": "Sea glass",
} as const;

const shapeLabels = {
  rectangular: "Rectangular",
  freeform: "Freeform",
  kidney: "Kidney",
  "l-shape": "L-shape",
} as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

router.post("/design-concepts/email", async (req, res) => {
  const parsed = EmailDesignConceptBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "The design concept payload is invalid." });
    return;
  }

  const concept = parsed.data;
  const subject = `Internal pool concept · ${concept.width}′ × ${concept.length}′ ${shapeLabels[concept.shape]}`;
  const featureList = [
    concept.lights ? "Pool lights" : null,
    concept.waterfall ? "Waterfall" : null,
    concept.sunShelf ? "Sun shelf" : null,
  ].filter((feature): feature is string => Boolean(feature));
  const features = featureList.length ? featureList.join(", ") : "No atmosphere features selected";

  const html = `
    <h1>Internal pool concept record</h1>
    <p>This message is for the Cove &amp; Stone team only. Do not send it automatically to the customer.</p>
    <h2>Concept summary</h2>
    <ul>
      <li><strong>Dimensions:</strong> ${concept.width}′ × ${concept.length}′</li>
      <li><strong>Shape:</strong> ${escapeHtml(shapeLabels[concept.shape])}</li>
      <li><strong>Water finish:</strong> ${escapeHtml(finishLabels[concept.waterFinish])}</li>
      <li><strong>Waterline tile:</strong> ${escapeHtml(tileLabels[concept.waterlineTile])}</li>
      <li><strong>Atmosphere:</strong> ${escapeHtml(features)}</li>
    </ul>
    <p>The attached SVG is an illustrative concept study generated from the customer's selections. Review the source photo and project scope with the customer before treating it as a build document.</p>
  `;

  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: SENDER,
        to: [INTERNAL_RECIPIENT],
        subject,
        html,
        attachments: [
          {
            filename: `cove-stone-${concept.width}x${concept.length}-concept.svg`,
            content: Buffer.from(concept.svg, "utf8").toString("base64"),
          },
        ],
      }),
    });

    if (!response.ok) {
      const providerMessage = await response.text();
      req.log.error(
        { providerStatus: response.status, providerMessage },
        "Internal design concept email failed",
      );
      res.status(502).json({ message: "The internal design email could not be sent." });
      return;
    }

    res.status(202).json({ status: "sent" });
  } catch (error) {
    req.log.error({ err: error }, "Internal design concept email request failed");
    res.status(502).json({ message: "The internal design email could not be sent." });
  }
});

export default router;