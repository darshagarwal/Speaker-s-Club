import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { createSubscriber, findAllSubscribers, deleteSubscriber } from "./queries/subscribers";

export const subscriberRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        email: z.string().email("Valid email is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await createSubscriber({ email: input.email });
        return { success: true };
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          return { success: false, message: "Email already subscribed" };
        }
        throw error;
      }
    }),

  list: adminQuery.query(async () => {
    return findAllSubscribers();
  }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteSubscriber(input.id);
      return { success: true };
    }),
});
