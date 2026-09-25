import { Router, type IRouter, type Response } from "express";
import {
  EmailDesignConceptBody,
  GeneratePoolConceptRenderBody,
  GeneratePoolConceptRenderResponse,
  StartPoolConceptWalkthroughBody,
  StartPoolConceptWalkthroughResponse,
} from "@workspace/api-zod";
import { renderBackyardPool } from "@workspace/integrations-gemini-ai";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  getReadyPoolConceptVideoId,
  getPoolConceptVideoJob,
  readPoolConceptVideo,
  startPoolConceptVideoJob,
} from "../services/pool-concept-video";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const INTERNAL_RECIPIENT = "Sales@coveandstonepools.com";
const SENDER = "Cove & Stone Pools <Sales@coveandstonepools.com>";
const UNVERIFIED_SENDER_MESSAGE =
  "We could not send your design right now. Please contact Sales directly at Sales@coveandstonepools.com.";
const MAX_RENDER_IMAGE_BYTES = 2 * 1024 * 1024;
const RENDER_RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_RENDERS_PER_WINDOW = 3;
const MAX_VIDEO_RETRIES_PER_WINDOW = 3;
const renderRequestsByIp = new Map<string, number[]>();
const videoRetryRequestsByIp = new Map<string, number[]>();

const FINISH_LABELS = {
  "white-plaster": "White plaster",
  "arctic-quartz": "Arctic quartz",
  "sandbar-quartz": "Sandbar quartz",
  "sea-glass-quartz": "Sea-glass quartz",
  "lagoon-pebble": "Lagoon pebble",
  "ocean-blue-pebble": "Ocean-blue pebble",
  "silver-pebble": "Silver pebble",
  greenstone: "Greenstone",
  "midnight-pebble": "Midnight pebble",
} as const;

const FINISH_PROMPTS = {
  "white-plaster": "a classic smooth white pool interior with pale sky-blue water",
  "arctic-quartz": "a bright quartz pool interior with clear light aqua water",
  "sandbar-quartz": "a warm sand-colored quartz interior with soft turquoise water",
  "sea-glass-quartz": "a mint sea-glass quartz interior with luminous aqua water",
  "lagoon-pebble": "an aqua pebble interior with coastal teal water",
  "ocean-blue-pebble": "a blue pebble interior with vivid ocean-blue water",
  "silver-pebble": "a cool silver pebble interior with blue-gray water",
  greenstone: "a mineral-green interior with softly organic teal water",
  "midnight-pebble": "a charcoal pebble interior with deep ink-blue water",
} as const;

const TILE_LABELS = {
  "pale-limestone": "Pale limestone",
  shellstone: "Shellstone",
  "mist-porcelain": "Mist porcelain",
  "warm-travertine": "Warm travertine",
  "sea-glass": "Sea glass",
  "lagoon-glass": "Lagoon glass",
  "ocean-blue-glass": "Ocean-blue glass",
  "deep-navy-glass": "Deep blue glass",
  "charcoal-mosaic": "Charcoal mosaic",
} as const;

const DECK_TILE_LABELS = {
  "shell-limestone": "Shell limestone",
  "ivory-porcelain": "Ivory porcelain",
  "silver-porcelain": "Silver porcelain",
  "sand-travertine": "Sand travertine",
  "warm-limestone": "Warm limestone",
  "coastal-shellstone": "Coastal shellstone",
  "charcoal-porcelain": "Charcoal porcelain",
  "dark-gray-porcelain": "Dark gray porcelain",
  "black-marble-porcelain": "Black marble-look porcelain",
  "terracotta-clay-pavers": "Terracotta clay pavers",
  "blue-gray-bluestone": "Blue-gray bluestone",
  "warm-gray-concrete-pavers": "Warm-gray concrete pavers",
} as const;

const FEATURE_LABELS = {
  spa: "Raised spa with pool spillover",
  "spa-waterfall": "Legacy spa spillover (treated as integrated spa)",
  "infinity-edge": "Infinity edge",
  "pool-lights": "Pool lights",
  "sun-shelf": "Sun shelf",
  "sheer-descent": "Sheer-descent waterfall",
  bubblers: "Sun-shelf bubblers",
  "pool-pergola-rainfall": "Pergola sheer-descent waterfall add-on",
  "sunken-fire-pit": "Sunken fire pit",
  "outdoor-kitchen": "Outdoor kitchen",
  "fire-bowls": "Fire bowls",
  pergola: "Pergola",
  "outdoor-shower": "Outdoor shower",
} as const;

const FEATURE_PROMPTS = {
  spa: "a separate raised spa beside the pool, with a clean spillover lip flowing directly into the swimming pool",
  "spa-waterfall": "an integrated raised spa with a broad spillover directly into the pool",
  "infinity-edge": "an infinity edge with water flowing over one vanishing edge",
  "pool-lights": "subtle underwater pool lighting",
  "sun-shelf": "a shallow sun shelf",
  "sheer-descent": "a clean architectural sheer-descent waterfall",
  bubblers: "gentle bubblers on the sun shelf",
  "pool-pergola-rainfall": "one smooth, continuous sheer-descent sheet of water flowing from a narrow horizontal spillway integrated into the front beam of the selected pergola and falling straight into the pool, with crisp edges and a calm glassy surface; keep the water source visibly attached to the pergola, do not depict overhead rain or a shower, do not add a separate waterfall wall, and do not add a second pergola",
  "sunken-fire-pit": "a sunken outdoor fire-pit lounge",
  "outdoor-kitchen": "a built-in outdoor kitchen",
  "fire-bowls": "sculptural fire bowls beside the pool",
  pergola: "a simple modern pergola positioned mostly behind the pool, adjacent to the outdoor kitchen, providing shade with only a slight overhang",
  "outdoor-shower": "a discreet outdoor shower",
} as const;

const LAYOUT_ITEM_LABELS = {
  pool: "pool",
  pergola: "pergola",
  "sun-shelf": "sun shelf",
  "sheer-descent": "sheer-descent waterfall",
  "pool-lights": "underwater pool lights",
  "infinity-edge": "infinity edge",
  bubblers: "sun-shelf bubblers",
  spa: "raised spa",
  "outdoor-kitchen": "outdoor kitchen",
  "sunken-fire-pit": "sunken fire-pit lounge",
  "fire-bowls": "fire bowls",
  "outdoor-shower": "outdoor shower",
} as const;

const FEATURE_LAYOUT_ITEM_IDS: Record<string, string> = {
  spa: "spa",
  "spa-waterfall": "spa",
  "infinity-edge": "infinity-edge",
  "pool-lights": "pool-lights",
  "sun-shelf": "sun-shelf",
  "sheer-descent": "sheer-descent",
  bubblers: "bubblers",
  "pool-pergola-rainfall": "pergola",
  pergola: "pergola",
  "sunken-fire-pit": "sunken-fire-pit",
  "outdoor-kitchen": "outdoor-kitchen",
  "fire-bowls": "fire-bowls",
  "outdoor-shower": "outdoor-shower",
};

const SHAPE_LABELS = {
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

function registerLimitedRequest(
  requestsByIp: Map<string, number[]>,
  ip: string,
  maxRequests: number,
  now = Date.now(),
) {
  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RENDER_RATE_WINDOW_MS,
  );
  if (recentRequests.length >= maxRequests) {
    requestsByIp.set(ip, recentRequests);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((recentRequests[0] + RENDER_RATE_WINDOW_MS - now) / 1000),
      ),
    };
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);

  if (requestsByIp.size > 5_000) {
    for (const [key, timestamps] of requestsByIp) {
      if (!timestamps.some((timestamp) => now - timestamp < RENDER_RATE_WINDOW_MS)) {
        requestsByIp.delete(key);
      }
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

function rejectRateLimitedGeneration(
  res: Response,
  retryAfterSeconds: number,
  maxRequests: number,
  action: "renders" | "video retries",
) {
  const retryMinutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
  res.set("Retry-After", String(retryAfterSeconds)).status(429).json({
    message: `You've reached the limit of ${maxRequests} AI ${action} per 15 minutes. Try again in about ${retryMinutes} minute${retryMinutes === 1 ? "" : "s"}.`,
  });
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
  const deckTileAppearance =
    concept.deckTile === "dark-gray-porcelain"
      ? "matte dark gray porcelain pavers with restrained fine stone grain"
      : concept.deckTile === "black-marble-porcelain"
        ? "near-black marble-look porcelain pavers with subtle pale veining"
        : concept.deckTile === "terracotta-clay-pavers"
          ? "warm terracotta clay pavers with subtle natural surface variation"
          : concept.deckTile === "blue-gray-bluestone"
            ? "blue-gray natural bluestone pavers with quiet mineral grain"
            : concept.deckTile === "warm-gray-concrete-pavers"
              ? "warm-gray architectural concrete pavers with lightly exposed fine aggregate"
              : `${DECK_TILE_LABELS[concept.deckTile].toLowerCase()} tile`;
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

  const rateLimit = registerLimitedRequest(
    renderRequestsByIp,
    req.ip || req.socket.remoteAddress || "unknown",
    MAX_RENDERS_PER_WINDOW,
  );
  if (!rateLimit.allowed) {
    rejectRateLimitedGeneration(
      res,
      rateLimit.retryAfterSeconds,
      MAX_RENDERS_PER_WINDOW,
      "renders",
    );
    return;
  }

  const features = concept.features.map((feature) => FEATURE_PROMPTS[feature]);
  const selectedLayoutItemIds = new Set([
    "pool",
    ...concept.features.map((feature) => FEATURE_LAYOUT_ITEM_IDS[feature]),
  ]);
  const layoutInstructions = (concept.layoutElements ?? [])
    .filter((item) => selectedLayoutItemIds.has(item.id))
    .map((item) => {
      const horizontal = item.offsetX === 0
        ? "at its default horizontal position"
        : `shifted ${Math.abs(item.offsetX).toFixed(1)}% of the scene width ${item.offsetX < 0 ? "left" : "right"} from its default position`;
      const vertical = item.offsetY === 0
        ? "at its default vertical position"
        : `shifted ${Math.abs(item.offsetY).toFixed(1)}% of the scene height ${item.offsetY < 0 ? "up" : "down"} from its default position`;
      return `${LAYOUT_ITEM_LABELS[item.id]}: ${horizontal}, ${vertical}, width ${Math.round(item.scaleX * 100)}% and depth ${Math.round(item.scaleY * 100)}% of its default proportions`;
    });

  const prompt = [
    "Edit the attached real backyard photo into one photorealistic residential pool design concept.",
    "Keep the same property, camera angle, perspective, house, fences, trees, major landscaping, and visible site boundaries recognizable.",
    `Add a realistically scaled ${concept.width}-by-${concept.length}-foot ${SHAPE_LABELS[concept.shape].toLowerCase()} in-ground pool that fits the existing yard.`,
    `Use ${FINISH_PROMPTS[concept.poolFinish]} and ${TILE_LABELS[concept.waterlineTile].toLowerCase()} waterline tile.`,
    `Use ${deckTileAppearance} in a consistent large-format module across the deck and all the way to the water as one continuous, flush surface. Keep the pool edge modern, level, and seamless; do not add a raised, contrasting, bullnose, or differently sized coping band.`,
    `Pool edge treatment: ${concept.edgeTreatment === "flush-continuous" ? "continuous flush deck tile, same module at the water's edge, with no separate coping" : "continuous flush deck tile"}.`,
    features.length ? `Include only the individually selected features: ${features.join(", ")}.` : "Do not add unselected pool or outdoor-living features.",
    layoutInstructions.length
      ? `Follow the user's edited layout and relative feature proportions: ${layoutInstructions.join("; ")}. Keep the entered pool dimensions unchanged and keep all elements plausible within the photographed property.`
      : "Use a balanced, physically plausible arrangement for the selected pool and outdoor features.",
    "Make the pool and surrounding hardscape look physically plausible and integrated with the original photograph.",
    "Keep architectural lines, pool edges, and tile joints straight and continuous. Avoid warped or duplicated objects, melted surfaces, floating items, broken perspective, and accidental additions.",
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

    const responseBody = GeneratePoolConceptRenderResponse.pick({
      imageDataUrl: true,
    }).safeParse({
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

    const videoJobId = await startPoolConceptVideoJob(
      connectors,
      responseBody.data.imageDataUrl,
      (error) => {
        req.log.error({ err: error }, "AI pool walkthrough generation failed");
      },
    );
    const completeResponse = GeneratePoolConceptRenderResponse.safeParse({
      ...responseBody.data,
      videoJobId,
    });
    if (!completeResponse.success) {
      req.log.error(
        { err: completeResponse.error },
        "AI pool concept walkthrough did not match the response contract",
      );
      res.status(502).json({
        message: "The AI rendering was created, but its walkthrough could not be started.",
      });
      return;
    }

    res.json(completeResponse.data);
  } catch (error) {
    req.log.error({ err: error }, "AI pool concept generation failed");
    res.status(502).json({
      message: "The AI rendering could not be created. Your uploaded photo is unchanged.",
    });
  }
});

router.get("/design-concepts/video-jobs/:videoJobId", (req, res) => {
  const status = getPoolConceptVideoJob(req.params.videoJobId);
  if (!status) {
    res.status(404).json({ message: "The pool walkthrough job expired or was not found." });
    return;
  }
  res.json(status);
});

router.post("/design-concepts/walkthrough", async (req, res): Promise<void> => {
  const parsed = StartPoolConceptWalkthroughBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "The AI rendering cannot be used as a video frame." });
    return;
  }

  const rateLimit = registerLimitedRequest(
    videoRetryRequestsByIp,
    req.ip || req.socket.remoteAddress || "unknown",
    MAX_VIDEO_RETRIES_PER_WINDOW,
  );
  if (!rateLimit.allowed) {
    rejectRateLimitedGeneration(
      res,
      rateLimit.retryAfterSeconds,
      MAX_VIDEO_RETRIES_PER_WINDOW,
      "video retries",
    );
    return;
  }

  try {
    const videoJobId = await startPoolConceptVideoJob(
      connectors,
      parsed.data.imageDataUrl,
      (error) => {
        req.log.error({ err: error }, "AI pool walkthrough retry failed");
      },
    );
    const response = StartPoolConceptWalkthroughResponse.safeParse({ videoJobId });
    if (!response.success) {
      req.log.error({ err: response.error }, "AI walkthrough retry response was invalid");
      res.status(502).json({ message: "The MP4 retry could not be started." });
      return;
    }
    res.status(202).json(response.data);
  } catch (error) {
    req.log.error({ err: error }, "AI pool walkthrough retry could not be started");
    res.status(502).json({ message: "The MP4 retry could not be started." });
  }
});

router.post("/design-concepts/email", async (req, res) => {
  const parsed = EmailDesignConceptBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn(
      { issues: parsed.error.issues.map(({ path, message }) => ({ path, message })) },
      "Invalid internal design concept email payload",
    );
    res.status(400).json({
      message: "Some contact details or design information are missing or invalid. Check them and try again.",
    });
    return;
  }

  const concept = parsed.data;
  const safeCustomerName = concept.customerName.replace(/[\r\n]+/g, " ").trim();
  const subject = `Pool concept · ${safeCustomerName} · ${concept.width}′ × ${concept.length}′ ${SHAPE_LABELS[concept.shape]}`;
  const featureList = concept.features.map((feature) => FEATURE_LABELS[feature]);
  const features = featureList.length ? featureList.join(", ") : "No optional features selected";
  if (concept.aiRenderDataUrl && !concept.videoJobId) {
    res.status(400).json({
      message: "The AI walkthrough is not ready. Wait for it to finish before sending the design.",
    });
    return;
  }

  const attachments = [
    {
      filename: `cove-stone-${concept.width}x${concept.length}-design.svg`,
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
      `cove-stone-ai-pool-design.${extension}`,
      ["image/png", "image/jpeg"],
    );
    if (!aiRender) {
      res.status(400).json({ message: "The AI pool rendering image is invalid." });
      return;
    }
    attachments.push(aiRender);
  }

  if (concept.videoJobId) {
    const videoId = getReadyPoolConceptVideoId(concept.videoJobId);
    if (!videoId) {
      res.status(400).json({
        message: "The pool walkthrough is not ready or has expired. Retry the MP4 before sending the design.",
      });
      return;
    }

    let video: Buffer | null;
    try {
      video = await readPoolConceptVideo(videoId);
    } catch (error) {
      req.log.error({ err: error }, "Pool walkthrough could not be prepared for email");
      res.status(502).json({ message: "The pool walkthrough could not be attached." });
      return;
    }
    if (!video) {
      res.status(400).json({
        message: "The pool walkthrough is no longer available. Create a new AI rendering and try again.",
      });
      return;
    }
    attachments.push({
      filename: `cove-stone-${concept.width}x${concept.length}-pool-walkthrough.mp4`,
      content: video.toString("base64"),
      content_type: "video/mp4",
    });
  }

  const html = `
    <h1>Internal pool concept record</h1>
    <p>This message is for the Cove &amp; Stone team only. Do not send it automatically to the customer.</p>
    <h2>Customer contact</h2>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(concept.customerName)}</li>
      <li><strong>Property address:</strong> ${escapeHtml(concept.customerAddress)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(concept.customerPhone)}</li>
    </ul>
    <h2>Concept summary</h2>
    <ul>
      <li><strong>Dimensions:</strong> ${concept.width}′ × ${concept.length}′</li>
      <li><strong>Shape:</strong> ${escapeHtml(SHAPE_LABELS[concept.shape])}</li>
      <li><strong>Pool interior finish:</strong> ${escapeHtml(FINISH_LABELS[concept.poolFinish])}</li>
      <li><strong>Waterline tile:</strong> ${escapeHtml(TILE_LABELS[concept.waterlineTile])}</li>
      <li><strong>Continuous deck / pool edge:</strong> ${escapeHtml(DECK_TILE_LABELS[concept.deckTile])} tile, flush to the water; no separate coping band</li>
      <li><strong>Pool edge treatment:</strong> ${escapeHtml(concept.edgeTreatment)}</li>
      <li><strong>Individually selected features:</strong> ${escapeHtml(features)}</li>
    </ul>
    <p>The attached SVG is an illustrative concept study generated from the customer's selections. ${concept.aiRenderDataUrl ? "The AI-generated pool rendering, MP4 walkthrough, and original backyard photo are also attached for internal review." : "The original backyard photo is attached when one was provided; no AI rendering or walkthrough was generated for this concept."}</p>
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
      if (
        response.status === 403 &&
        providerMessage.toLowerCase().includes("domain") &&
        providerMessage.toLowerCase().includes("not verified")
      ) {
        res.status(502).json({ message: UNVERIFIED_SENDER_MESSAGE });
        return;
      }
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