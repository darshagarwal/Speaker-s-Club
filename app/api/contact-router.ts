import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { createContact, findAllContacts, deleteContact } from "./queries/contacts";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        subject: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      await createContact({
        name: input.name,
        email: input.email,
        subject: input.subject || "",
        message: input.message,
      });
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    return findAllContacts();
  }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteContact(input.id);
      return { success: true };
    }),
});
