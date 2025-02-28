import { Animal, Food, Shelter } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { ZodSchema } from "zod";

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

export const uploadPhoto = async (
  file: File,
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
