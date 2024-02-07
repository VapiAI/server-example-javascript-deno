import {
  cors,
  prettyJSON,
} from "https://deno.land/x/hono@v3.12.8/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { customLLMRoute } from "./api/custom-llm/index.ts";
import { functionCallRoute } from "./api/functions/index.ts";
import { inboundRoute } from "./api/inbound.ts";
import { outboundRoute } from "./api/outbound.ts";
import { webhookRoute } from "./api/webhook/index.ts";
import { Bindings } from "./types/hono.types.ts";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON());
app.use("*", cors());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.route("/api/inbound", inboundRoute);
app.route("/api/outbound", outboundRoute);
app.route("/api/webhook", webhookRoute);

app.route("/api/functions", functionCallRoute);
app.route("/api/custom-llm", customLLMRoute);
Deno.serve(app.fetch);
