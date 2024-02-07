import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { Bindings } from "../../types/hono.types.ts";
import { basicHandler } from "./basic.ts";
import { ragHandler } from "./rag.ts";

const app = new Hono<{ Bindings: Bindings }>();

app.route("basic", basicHandler);
app.route("rag", ragHandler);

export { app as functionCallRoute };
