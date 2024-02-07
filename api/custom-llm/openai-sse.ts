import { streamSSE } from "https://deno.land/x/hono@v3.12.8/helper.ts";
import type { Context } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { OpenAI } from "https://deno.land/x/openai@v4.26.1/mod.ts";
import { envConfig } from "../../config/env.config.ts";
import { Bindings } from "../../types/hono.types.ts";

const openAISSEHandler = new Hono<{ Bindings: Bindings }>();

openAISSEHandler.post("chat/completions", async (c: Context) => {
  const openai = new OpenAI({ apiKey: envConfig.openai.apiKey });
  const { model, messages, max_tokens, temperature, stream, ...restParams } =
    await c.req.json();

  try {
    if (stream) {
      const completionStream = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo",
        ...restParams,
        messages,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: true,
      } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);

      return streamSSE(c, async (stream) => {
        for await (const data of completionStream) {
          await stream.writeSSE({
            data: JSON.stringify(data),
          });
        }
      });
    } else {
      const completion = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo",
        ...restParams,
        messages,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: false,
      });
      return c.json(completion, 200);
    }
  } catch (e: any) {
    console.log(e);
    return c.json({ error: e.message }, 500);
  }
});

export { openAISSEHandler };
