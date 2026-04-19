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

app.listen(port, () => {
  console.log(`OceanGuard API listening on http://localhost:${port}`);
});
