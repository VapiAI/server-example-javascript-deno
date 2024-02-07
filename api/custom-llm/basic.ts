import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { Bindings } from "../../types/hono.types.ts";

const app = new Hono<{ Bindings: Bindings }>();

app.post("chat/completions", async (c) => {
  try {
    const {
      model,
      messages,
      max_tokens,
      temperature,
      stream,
      call,
      ...restParams
    } = await c.req.json();
    const response = {
      id: "chatcmpl-8mcLf78g0quztp4BMtwd3hEj58Uof",
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gpt-3.5-turbo-0613",
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          delta: { content: messages?.[messages.length - 1]?.content ?? "" },
          logprobs: null,
          finish_reason: "stop",
        },
      ],
    };

    return c.json(response, 201);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

export { app as basicHandler };
