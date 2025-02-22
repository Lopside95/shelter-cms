import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const createTRPCContext = cache(async () => {
  return {};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
