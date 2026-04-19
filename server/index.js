import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
  console.log(`OceanGuard API listening on http://localhost:${port}`);
});
