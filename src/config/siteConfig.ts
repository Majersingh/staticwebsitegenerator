import generated from "./generatedConfig.json";
import { SiteConfig } from "@/types/config";

// Cast the generated JSON to the SiteConfig interface so optional social fields
// (e.g. facebook, instagram) are accepted by TypeScript even if they're missing
// from the current JSON file.
export const siteConfig: SiteConfig = generated as unknown as SiteConfig;
