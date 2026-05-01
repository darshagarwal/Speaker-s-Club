import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { createChatMessage, findChatHistoryBySession } from "./queries/chatMessages";

export const aiChatRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        sessionId: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      await createChatMessage({
        sessionId: input.sessionId,
        role: "user",
        content: input.message,
      });

      const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MOONSHOT_API_KEY || ""}`,
        },
        body: JSON.stringify({
          model: "moonshot-v1-8k",
          messages: [
            {
              role: "system",
              content:
                "You are a professional public speaking coach and mentor for Speakers Club. You help people improve their public speaking, storytelling, presentation skills, and confidence. Provide practical, actionable advice. Be encouraging but honest. Keep responses concise and helpful.",
            },
            { role: "user", content: input.message },
          ],
          temperature: 0.7,
        }),
      });

      let aiResponse = "I'm here to help you improve your speaking skills! What would you like to work on today?";

      if (response.ok) {
        const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
        aiResponse = data.choices?.[0]?.message?.content || aiResponse;
      }

      await createChatMessage({
        sessionId: input.sessionId,
        role: "assistant",
        content: aiResponse,
      });

      return { response: aiResponse };
    }),

  history: publicQuery
    .input(z.object({ sessionId: z.string().min(1) }))
    .query(async ({ input }) => {
      return findChatHistoryBySession(input.sessionId);
    }),
});
