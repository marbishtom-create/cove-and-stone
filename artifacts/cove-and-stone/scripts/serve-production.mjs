import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const artifactRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(artifactRoot, "dist", "public");
const port = Number(process.env.PORT);

if (!port) {
  throw new Error("PORT environment variable is required.");
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function canonicalPathname(pathname) {
  if (pathname === "/") {
    return "/";
  }

  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

function redirectUrl(host, pathname, search) {
  if (host.toLowerCase() === "www.coveandstonepools.com") {
    return `https://coveandstonepools.com${pathname}${search}`;
  }

  return `${pathname}${search}`;
}

function notFoundHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Page not found | Cove &amp; Stone Pools</title>
    <style>
      :root { color-scheme: light; font-family: Georgia, serif; background: #f5f3ef; color: #242321; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; }
      main { box-sizing: border-box; width: min(680px, calc(100% - 40px)); padding: 64px 40px; border: 1px solid #d9d5cc; background: #fff; text-align: center; }
      .eyebrow { color: #9b7650; font: 600 11px/1.4 Arial, sans-serif; letter-spacing: .28em; text-transform: uppercase; }
      h1 { margin: 20px 0; font-size: clamp(42px, 8vw, 76px); font-weight: 400; line-height: 1.05; }
      p { margin: 0 auto 36px; max-width: 520px; color: #69655e; font: 18px/1.65 Arial, sans-serif; }
      a { display: inline-block; padding: 16px 24px; background: #242321; color: #fff; font: 600 12px/1 Arial, sans-serif; letter-spacing: .16em; text-decoration: none; text-transform: uppercase; }
      a:hover { background: #9b7650; }
    </style>
  </head>
  <body>
    <main>
      <div class="eyebrow">Cove &amp; Stone Pools</div>
      <h1>That page is not here.</h1>
      <p>The address may be outdated or the page may have moved. Start with our main collection of pool and outdoor-living design services.</p>
      <a href="/">Return home</a>
    </main>
  </body>
</html>`;
}

function parseByteRange(rangeHeader, fileSize) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!match || (!match[1] && !match[2]) || fileSize <= 0) {
    return null;
  }

  let start;
  let end;

  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return null;
    }
    start = Math.max(fileSize - suffixLength, 0);
    end = fileSize - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : fileSize - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
      return null;
    }
    end = Math.min(end, fileSize - 1);
  }

  if (start < 0 || start >= fileSize || end < start) {
    return null;
  }

  return { start, end };
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveRequest(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const requestedPath = path.resolve(publicRoot, relativePath);
  if (!requestedPath.startsWith(`${publicRoot}${path.sep}`) && requestedPath !== publicRoot) {
    return null;
  }

  if (decodedPath.endsWith("/")) {
    const routeFile = path.join(requestedPath, "index.html");
    return (await fileExists(routeFile))
      ? { file: routeFile, isRoute: true }
      : null;
  }

  const directFile = await stat(requestedPath).catch(() => null);
  if (directFile?.isFile()) {
    return { file: requestedPath, isRoute: false };
  }

  const routeFile = path.join(requestedPath, "index.html");
  return (await fileExists(routeFile))
    ? { file: routeFile, isRoute: true }
    : null;
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    const host = String(request.headers.host || "").split(":")[0];
    const pathname = requestUrl.pathname || "/";
    const routeFile = await resolveRequest(pathname);

    if (
      host === "www.coveandstonepools.com" ||
      (routeFile?.isRoute && pathname !== "/" && !pathname.endsWith("/"))
    ) {
      const targetPath =
        host === "www.coveandstonepools.com"
          ? pathname
          : canonicalPathname(pathname);
      response.writeHead(301, {
        Location: redirectUrl(host, targetPath, requestUrl.search),
        "Cache-Control": "public, max-age=300",
      });
      response.end();
      return;
    }

    if (!routeFile) {
      response.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      });
      response.end(notFoundHtml());
      return;
    }

    const extension = path.extname(routeFile.file).toLowerCase();
    const fileStats = await stat(routeFile.file);
    const isVideo = extension === ".mp4";
    const contentType = contentTypes[extension] || "application/octet-stream";
    const cacheControl =
      extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable";
    const rangeHeader = request.headers.range;

    if (isVideo && request.method === "GET" && rangeHeader) {
      const range = parseByteRange(rangeHeader, fileStats.size);
      if (!range) {
        response.writeHead(416, {
          "Accept-Ranges": "bytes",
          "Cache-Control": "no-store",
          "Content-Range": `bytes */${fileStats.size}`,
          "Content-Length": "0",
        });
        response.end();
        return;
      }

      const contentLength = range.end - range.start + 1;
      response.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Cache-Control": cacheControl,
        "Content-Length": contentLength,
        "Content-Range": `bytes ${range.start}-${range.end}/${fileStats.size}`,
        "Content-Type": contentType,
      });
      createReadStream(routeFile.file, range).pipe(response);
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
      "Content-Length": fileStats.size,
      ...(isVideo ? { "Accept-Ranges": "bytes" } : {}),
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(routeFile.file).pipe(response);
  } catch (error) {
    console.error(error);
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end("Internal server error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Cove & Stone production server listening on port ${port}`);
});