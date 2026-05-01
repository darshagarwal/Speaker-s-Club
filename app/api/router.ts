import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { contactRouter } from "./contact-router";
import { subscriberRouter } from "./subscriber-router";
import { userRouter } from "./user-router";
import { aiChatRouter } from "./ai-chat-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  contact: contactRouter,
  subscriber: subscriberRouter,
  user: userRouter,
  aiChat: aiChatRouter,
});

export type AppRouter = typeof appRouter;
