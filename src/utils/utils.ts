import { ZodSchema } from "zod";
import { PrismaClient } from "@prisma/client";
import { procedure, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { TRPCClientError } from "@trpc/client";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

interface ConflictError {
  input: ZodSchema | string | number;
  code: TRPC_ERROR_CODE_KEY;
  message: string;
}
// interface ConflictError<T> {
//   input: ZodSchema;
//   model: T;
//   code: string;
//   message: string;
// }

// const prisma = new PrismaClient();

export const conflictError = async ({
  input,
}: //   code,
//   message,
ConflictError) => {
  throw new TRPCError({
    code: "CONFLICT",
    message: `Conflict found for ${input as string}`,
    // cause: new Error(message),
  });
};

// export const isConflictError = async <T>(
//   input: ZodSchema,
//   model: keyof PrismaClient,
//   property: keyof T,
//   value: unknown
// ) => {
//   //eslint-disable-next-line
//   const res = await (prisma[model] as any).findFirst({
//     where: {
//       [property]: value,
//     },
//   });

//   if (res) {
//     return {
//       input,
//       model,
//       code: "CONFLICT_ERROR",
//       message: `Conflict found for ${property as string}`,
//     } as ConflictError<T>;
//   }

//   return null;

//   //   const res = await (prisma[model] as any).findFirst({
//   //     where: {
//   //       [property]: value,
//   //     },
//   //   });
// };
