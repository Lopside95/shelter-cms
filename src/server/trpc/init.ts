import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
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
export const baseProcedure = t.procedure;

// const prisma = new PrismaClient();
// return prisma;
// export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//   const session = await getSession({ req: opts.req });

//   return {
//     session,
//   };
// };
