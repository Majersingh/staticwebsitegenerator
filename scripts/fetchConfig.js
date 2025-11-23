import fs from "fs";
import path from "path";
import fetch from "node-fetch";

async function run() {
    const userId = process.env.USER_ID ||'okbroMarketMaven';
    const API_URL = `https://buildyourweb.netlify.app/api/siteconfig/${userId}`;

    console.log("Fetching site config for" , userId);

    const res = await fetch(API_URL);
    const json = await res.json();

    if (!json.success) {
        console.error("Config fetch failed!");
        process.exit(1);
    }

    const config = json.data;

    const outPath = path.join("src/config/generatedConfig.json");

    fs.writeFileSync(outPath, JSON.stringify(config, null, 2));

    console.log("Generated config:");
    console.log(config);
}

run();
