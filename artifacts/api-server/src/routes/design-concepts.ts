import { Router, type IRouter } from "express";
import {
  EmailDesignConceptBody,
  GeneratePoolConceptRenderBody,
  GeneratePoolConceptRenderResponse,
} from "@workspace/api-zod";
import { renderBackyardPool } from "@workspace/integrations-gemini-ai";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const INTERNAL_RECIPIENT = "Sales@coveandstonepools.com";
const SENDER = "Cove & Stone Pools <Sales@coveandstonepools.com>";
const MAX_RENDER_IMAGE_BYTES = 2 * 1024 * 1024;
const RENDER_RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_RENDERS_PER_WINDOW = 3;
const renderRequestsByIp = new Map<string, number[]>();

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

function allowRenderRequest(ip: string, now = Date.now()) {
  const recentRequests = (renderRequestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RENDER_RATE_WINDOW_MS,
  );
  if (recentRequests.length >= MAX_RENDERS_PER_WINDOW) {
    renderRequestsByIp.set(ip, recentRequests);
    return false;
  }

  recentRequests.push(now);
  renderRequestsByIp.set(ip, recentRequests);

  if (renderRequestsByIp.size > 5_000) {
    for (const [key, timestamps] of renderRequestsByIp) {
      if (!timestamps.some((timestamp) => now - timestamp < RENDER_RATE_WINDOW_MS)) {
        renderRequestsByIp.delete(key);
      }
    }
  }

  return true;
}

function imageAttachment(
  dataUrl: string,
  filename: string,
  allowedTypes: readonly string[],
) {
  const match = /^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/]+={0,2})$/.exec(
    dataUrl,
  );
  if (!match || !allowedTypes.includes(match[1])) {
    return null;
  }

  return {
    filename,
    content: match[2],
    content_type: match[1],
  };
}

router.post("/design-concepts/render", async (req, res): Promise<void> => {
  const parsed = GeneratePoolConceptRenderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "The pool rendering request is invalid." });
    return;
  }

  const concept = parsed.data;
  const photoMatch =
    /^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/.exec(
      concept.photoDataUrl,
    );
  if (!photoMatch) {
    res.status(400).json({ message: "Upload a JPEG backyard photo to render." });
    return;
  }

  const photo = Buffer.from(photoMatch[1], "base64");
  if (photo.length === 0 || photo.length > MAX_RENDER_IMAGE_BYTES) {
    res.status(400).json({ message: "The optimized backyard photo is too large." });
    return;
  }

  if (!allowRenderRequest(req.ip || req.socket.remoteAddress || "unknown")) {
    res.status(429).json({
      message: "Please wait before creating another AI rendering.",
    });
    return;
  }

  const finishLabels = {
    "clear-cove": "soft aqua blue",
    "deep-atlas": "deep blue-charcoal",
    greenstone: "mineral teal",
  } as const;
  const tileLabels = {
    travertine: "warm travertine",
    "ink-line": "charcoal",
    "sea-glass": "mist aqua",
  } as const;
  const shapeLabels = {
    rectangular: "rectangular",
    freeform: "freeform",
    kidney: "kidney-shaped",
    "l-shape": "L-shaped",
  } as const;
  const features = [
    concept.lights ? "subtle underwater pool lighting" : null,
    concept.waterfall ? "a modest built-in waterfall" : null,
    concept.sunShelf ? "a shallow sun shelf" : null,
  ].filter((feature): feature is string => Boolean(feature));

  const prompt = [
    "Edit the attached real backyard photo into one photorealistic residential pool design concept.",
    "Keep the same property, camera angle, perspective, house, fences, trees, major landscaping, and visible site boundaries recognizable.",
    `Add a realistically scaled ${concept.width}-by-${concept.length}-foot ${shapeLabels[concept.shape]} in-ground pool that fits the existing yard.`,
    `Use ${finishLabels[concept.waterFinish]} water and ${tileLabels[concept.waterlineTile]} waterline tile.`,
    features.length ? `Include ${features.join(", ")}.` : "Do not add extra water features.",
    "Make the pool and surrounding hardscape look physically plausible and integrated with the original photograph.",
    "Show only the finished proposed scene, not a before-and-after split. Do not add text, labels, logos, people, or unsupported buildings.",
    "This is an illustrative design concept, not a construction drawing; preserve the image's landscape orientation when possible.",
  ].join(" ");

  try {
    const result = await renderBackyardPool({
      photoBase64: photoMatch[1],
      prompt,
    });
    if (result.mimeType !== "image/png" && result.mimeType !== "image/jpeg") {
      req.log.error({ mimeType: result.mimeType }, "AI pool concept returned an unsupported image type");
      res.status(502).json({ message: "The AI rendering returned an unsupported image." });
      return;
    }

    const responseBody = GeneratePoolConceptRenderResponse.safeParse({
      imageDataUrl: `data:${result.mimeType};base64,${result.data}`,
    });
    if (!responseBody.success) {
      req.log.error(
        { imageCharacters: result.data.length, err: responseBody.error },
        "AI pool concept did not match the response contract",
      );
      res.status(502).json({
        message: "The AI rendering returned an invalid image. Please try again.",
      });
      return;
    }

    res.json(responseBody.data);
  } catch (error) {
    req.log.error({ err: error }, "AI pool concept generation failed");
    res.status(502).json({
      message: "The AI rendering could not be created. Your uploaded photo is unchanged.",
    });
  }
});

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
  const attachments = [
    {
      filename: `cove-stone-${concept.width}x${concept.length}-concept.svg`,
      content: Buffer.from(concept.svg, "utf8").toString("base64"),
      content_type: "image/svg+xml",
    },
  ];
  if (concept.originalPhotoDataUrl) {
    const originalPhoto = imageAttachment(
      concept.originalPhotoDataUrl,
      "customer-backyard-before.jpg",
      ["image/jpeg"],
    );
    if (!originalPhoto) {
      res.status(400).json({ message: "The original backyard photo is invalid." });
      return;
    }
    attachments.push(originalPhoto);
  }

  if (concept.aiRenderDataUrl) {
    const mimeType = concept.aiRenderDataUrl.startsWith("data:image/png;")
      ? "image/png"
      : "image/jpeg";
    const extension = mimeType === "image/png" ? "png" : "jpg";
    const aiRender = imageAttachment(
      concept.aiRenderDataUrl,
      `cove-stone-ai-pool-concept.${extension}`,
      ["image/png", "image/jpeg"],
    );
    if (!aiRender) {
      res.status(400).json({ message: "The AI pool rendering image is invalid." });
      return;
    }
    attachments.push(aiRender);
  }

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
    <p>The attached SVG is an illustrative concept study generated from the customer's selections. ${concept.aiRenderDataUrl ? "The AI-generated pool rendering and original backyard photo are also attached for internal review." : "The original backyard photo is attached when one was provided; no AI rendering was generated for this concept."}</p>
    <p>AI images are visual references only. Confirm site conditions, engineering, dimensions, and project scope with the customer before treating any concept as a build document.</p>
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
        attachments,
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