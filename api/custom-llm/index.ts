import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { Bindings } from "../../types/hono.types.ts";
import { basicHandler } from "./basic.ts";
import { openAIAdvancedRoute } from "./openai-advanced.ts";
import { openAISSEHandler } from "./openai-sse.ts";

const app = new Hono<{ Bindings: Bindings }>();

app.route("basic", basicHandler);
app.route("openai-sse", openAISSEHandler);
app.route("openai-advanced", openAIAdvancedRoute);

export { app as customLLMRoute };
