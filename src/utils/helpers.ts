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

export const foodPayload = (food: Food) => {
  return {
    id: food.id,
    name: food.name,
    type: food.type,
    brand: food.brand,
    quantity: food.quantity,
    shelterId: food.shelter_id,
    createdAt: food.created_at,
    updatedAt: food.updated_at,
  };
};

export const animalPayload = (animal: Animal) => {
  return {
    id: animal.id,
    name: animal.name,
    species: animal.species,
    breed: animal.breed,
    age: animal.age,
    chipNumber: animal.chip_number,
    shelterId: animal.shelter_id,
    createdAt: animal.created_at,
    updatedAt: animal.updated_at,
    image: animal.image,
  };
};

export const shelterPayload = (shelter: Shelter) => {
  return {
    id: shelter.id,
    name: shelter.name,
    location: shelter.location,
    phone: shelter.phone,
    email: shelter.email,
    capacity: shelter.capacity,
    longitude: shelter.longitude,
    latitude: shelter.latitude,
    createdAt: shelter.created_at,
    updatedAt: shelter.updated_at,
  };
};

export const shelterWithAnimalsAndFood = (
  shelters: Shelter[],
  animals: Animal[],
  food: Food[]
) => {
  return {
    shelters: shelters.map(shelterPayload),
    animals: animals.map(animalPayload),
    food: food.map(foodPayload),
  };
};
