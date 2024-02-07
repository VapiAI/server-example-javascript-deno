import { load } from "https://deno.land/std@0.214.0/dotenv/mod.ts";

const env = await load();

export const envConfig = {
  weather: {
    baseUrl:
      env["WEATHER_BASE_URL"] ?? `https://api.openweathermap.org/data/2.5`,
    apiKey: env["WEATHER_API_KEY"] ?? ``,
  },
  openai: {
    apiKey: env["OPENAI_API_KEY"] ?? ``,
  },
  vapi: {
    baseUrl: env["VAPI_BASE_URL"] ?? "https://api.vapi.ai",
    apiKey: env["VAPI_API_KEY"] ?? "",
  },
};
