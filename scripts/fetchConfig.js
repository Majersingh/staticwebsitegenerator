import fs from "fs";
import path from "path";
import fetch from "node-fetch";
async function run() {
  try {
    // debug print to confirm env in Node
    console.log("DEBUG: process.env snapshot (selected keys):", {
      USER_ID: process.env.USER_ID,
      USER_CONFIG_API_URL: process.env.USER_CONFIG_API_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    const userId = process.env.USER_ID;
    const API_URL_BASE = process.env.USER_CONFIG_API_URL || "https://buildyourweb.netlify.app/api/siteconfig";
    const API_URL = `${API_URL_BASE}/${userId}`;

    console.log("Fetching site config for:", userId);
    console.log("API url:", API_URL);

    // Use native fetch (Node 18+). If not available you can require('node-fetch') instead.
    const res = await fetch(API_URL);
    if (!res.ok) {
      console.error("Fetch failed:", res.status, res.statusText);
      process.exit(1);
    }

    const json = await res.json();

    if (!json.success) {
      console.error("Config fetch failed, backend returned success=false:", json);
      process.exit(1);
    }

    const config = json.data;

    const outDir = path.join(process.cwd(), "src", "config");
    const outPath = path.join(outDir, "generatedConfig.json");

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(config, null, 2), "utf8");

    console.log("✅ Generated config saved to:", outPath);
    console.log("Generated config preview:", Object.keys(config).slice(0, 10));
    process.exit(0);
  } catch (err) {
    console.error("❌ Fetch script error:", err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

run();
