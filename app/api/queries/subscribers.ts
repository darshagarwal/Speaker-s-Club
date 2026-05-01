import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertSubscriber } from "@db/schema";
import { getDb } from "./connection";

export async function createSubscriber(data: InsertSubscriber) {
  const result = await getDb().insert(schema.subscribers).values(data).$returningId();
  return result[0]?.id;
}

export async function findAllSubscribers() {
  return getDb().query.subscribers.findMany({
    orderBy: (subscribers, { desc }) => [desc(subscribers.createdAt)],
  });
}

export async function deleteSubscriber(id: number) {
  await getDb().delete(schema.subscribers).where(eq(schema.subscribers.id, id));
}
