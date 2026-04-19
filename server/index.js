import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, "..", "public", "data");
const gfwApiKey = process.env.GFW_API_KEY || process.env.VITE_GFW_API_KEY;
const gfwHeatmapBaseUrl = "https://gateway.api.globalfishingwatch.org/v3/4wings";
const gfwHeatmapStyleQuery =
  "interval=DAY&color=%2300788a&datasets[0]=public-global-presence:latest&date-range=2024-01-01,2024-01-07";
const gfwHeatmapTileQuery = `format=PNG&${gfwHeatmapStyleQuery}`;
let cachedGfwStyle = process.env.GFW_HEATMAP_STYLE || process.env.VITE_GFW_HEATMAP_STYLE || "";

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    service: "OceanGuard API",
    message: "Fresh-start backend shell is running."
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "OceanGuard API" });
});

app.get("/api/geojson-files", async (_req, res) => {
  try {
    const files = await fs.readdir(dataDirectory);
    const geojsonFiles = files
      .filter((file) => file.toLowerCase().endsWith(".geojson") || file.toLowerCase().endsWith(".json"))
      .sort((left, right) => left.localeCompare(right))
      .map((file) => ({
        url: `/data/${file}`,
        title: path.basename(file, path.extname(file)).replace(/[-_]/g, " ")
      }));

    res.json({ files: geojsonFiles });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.json({ files: [] });
      return;
    }

    res.status(500).json({ error: "Unable to list GeoJSON files" });
  }
});

function extractGfwStyle(payload) {
  if (payload?.style) {
    return payload.style;
  }

  const serializedPayload = typeof payload === "string" ? payload : JSON.stringify(payload);
  const match = serializedPayload.match(/[?&]style=([^"&]+)/);

  return match ? decodeURIComponent(match[1]) : "";
}

async function getGfwHeatmapStyle() {
  if (cachedGfwStyle) {
    return cachedGfwStyle;
  }

  if (!gfwApiKey) {
    throw new Error("Missing GFW_API_KEY");
  }

  const response = await fetch(`${gfwHeatmapBaseUrl}/generate-png?${gfwHeatmapStyleQuery}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${gfwApiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`GFW style request failed with ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
  cachedGfwStyle = extractGfwStyle(payload);

  if (!cachedGfwStyle) {
    throw new Error("GFW style response did not include a style token");
  }

  return cachedGfwStyle;
}

app.get("/api/gfw/heatmap/:z/:x/:y", async (req, res) => {
  try {
    const style = await getGfwHeatmapStyle();
    const { z, x, y } = req.params;
    const tileUrl = `${gfwHeatmapBaseUrl}/tile/heatmap/${z}/${x}/${y}?${gfwHeatmapTileQuery}&style=${encodeURIComponent(style)}`;
    const tileResponse = await fetch(tileUrl, {
      headers: {
        Authorization: `Bearer ${gfwApiKey}`
      }
    });

    if (!tileResponse.ok) {
      res.status(tileResponse.status).json({ error: "GFW tile request failed" });
      return;
    }

    const arrayBuffer = await tileResponse.arrayBuffer();
    res.setHeader("Content-Type", tileResponse.headers.get("content-type") || "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`OceanGuard API listening on http://localhost:${port}`);
});
