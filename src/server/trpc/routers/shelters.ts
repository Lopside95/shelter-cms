import { z } from "zod";
import { procedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { shelterSchema } from "@/utils/schemas";
import { animalPayload, foodPayload, shelterPayload } from "@/utils/helpers";

export const sheltersRouter = router({
  getOnlyShelters: procedure.query(async () => {
    try {
      const shelters = await prisma.shelter.findMany();

      const payload = shelters.map((shelter) => shelterPayload(shelter));
      return payload;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to fetch shelters",
      });
    }
  }),
  getShelters: procedure.query(async () => {
    try {
      const shelters = await prisma.shelter.findMany({
        include: {
          animals: true,
          food: true,
        },
      });

      const payload = shelters.map((shelter) => ({
        ...shelterPayload(shelter),
        animals: shelter.animals.map((animal) => animalPayload(animal)),
        food: shelter.food.map((food) => foodPayload(food)),
      }));

      return payload;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to fetch shelters",
      });
    }
  }),
  getShelterById: procedure.input(z.number()).query(async ({ input }) => {
    try {
      const shelter = await prisma.shelter.findUnique({
        where: {
          id: input,
        },
        include: {
          animals: true,
          food: true,
        },
      });
      if (!shelter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shelter not found",
        });
      }

      const food = shelter.food.map((food) => foodPayload(food));
      const animals = shelter.animals.map((animal) => animalPayload(animal));

      const payload = {
        ...shelterPayload(shelter),
        animals,
        food,
      };

      return payload;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch shelter by ID",
      });
    }
  }),
  getShelterByName: procedure.input(z.string()).query(async ({ input }) => {
    try {
      const res = await prisma.shelter.findFirst({
        where: {
          name: input,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to fetch shelters",
      });
    }
  }),
  createShelter: procedure.input(shelterSchema).mutation(async ({ input }) => {
    try {
      const newShelter = await prisma.shelter.create({
        data: {
          capacity: input.capacity,
          name: input.name,
          location: input.location,
          longitude: 1,
          latitude: 1,
          phone: input.phone,
          email: input.email,

          animals: input?.animals
            ? {
                create: input.animals.map((animal) => ({
                  ...animal,
                  chip_number: animal.chipNumber,
                })),
              }
            : undefined,
          food: input.food
            ? {
                create: input.food.map((food) => ({
                  ...food,
                  quantity: food.quantity,
                })),
              }
            : undefined,
        },
      });

      return newShelter;
    } catch (error) {
      console.error(error);
    }
  }),
});

export default sheltersRouter;
