import { z } from "zod";
import bcrypt from "bcryptjs";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { signSessionToken } from "./kimi/session";
import { setCookie } from "hono/cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { TRPCError } from "@trpc/server";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const existing = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);
      const result = await db.insert(users).values({
        name: input.name,
        email: input.email,
        passwordHash,
        role: "user",
      }).$returningId();

      const userId = result[0]?.id;
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId!),
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }

      const token = await signSessionToken({
        unionId: `local_${user.id}`,
        clientId: process.env.APP_ID || "",
      });

      const cookieOpts = getSessionCookieOptions(ctx.req.headers);
      setCookie(ctx as any, Session.cookieName, token, {
        ...cookieOpts,
        maxAge: Session.maxAgeMs / 1000,
      });

      return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }),

  login: publicQuery
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      await db.update(users).set({ lastSignInAt: new Date() }).where(eq(users.id, user.id));

      const token = await signSessionToken({
        unionId: `local_${user.id}`,
        clientId: process.env.APP_ID || "",
      });

      const cookieOpts = getSessionCookieOptions(ctx.req.headers);
      setCookie(ctx as any, Session.cookieName, token, {
        ...cookieOpts,
        maxAge: Session.maxAgeMs / 1000,
      });

      return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }),
});
