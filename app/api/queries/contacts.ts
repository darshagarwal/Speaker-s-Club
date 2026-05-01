import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertContact } from "@db/schema";
import { getDb } from "./connection";

export async function createContact(data: InsertContact) {
  const result = await getDb().insert(schema.contacts).values(data).$returningId();
  return result[0]?.id;
}

export async function findAllContacts() {
  return getDb().query.contacts.findMany({
    orderBy: (contacts, { desc }) => [desc(contacts.createdAt)],
  });
}

export async function deleteContact(id: number) {
  await getDb().delete(schema.contacts).where(eq(schema.contacts.id, id));
}
