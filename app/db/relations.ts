import { relations } from "drizzle-orm";
import { users, chatMessages } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  chatMessages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));
