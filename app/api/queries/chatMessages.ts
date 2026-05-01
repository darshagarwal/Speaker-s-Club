import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertChatMessage } from "@db/schema";
import { getDb } from "./connection";

export async function createChatMessage(data: InsertChatMessage) {
  const result = await getDb().insert(schema.chatMessages).values(data).$returningId();
  return result[0]?.id;
}

export async function findChatHistoryBySession(sessionId: string) {
  return getDb()
    .select()
    .from(schema.chatMessages)
    .where(eq(schema.chatMessages.sessionId, sessionId))
    .orderBy(schema.chatMessages.createdAt);
}
