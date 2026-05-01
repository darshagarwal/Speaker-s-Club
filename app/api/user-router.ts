import { z } from "zod";
import { eq } from "drizzle-orm";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";

export const userRouter = createRouter({
  list: adminQuery.query(async () => {
    return getDb().query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  }),

  updateRole: adminQuery
    .input(
      z.object({
        id: z.number(),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.id));
      return { success: true };
    }),
});
