import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { animal, shelter } from "@/utils/types";
import { TRPCError } from "@trpc/server";
import { shelterSchema } from "@/utils/schemas";
import {
  animalPayload,
  foodPayload,
  shelterPayload,
  shelterWithAnimalsAndFood,
} from "@/utils/helpers";

export const sheltersRouter = router({
  getOnlyShelters: baseProcedure.query(async ({ ctx }) => {
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
  getSheltersWithOthers: baseProcedure.query(async ({ ctx }) => {
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
  getShelterById: baseProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      try {
        const res = await prisma.shelter.findUnique({
          where: {
            id: input,
          },
        });
        if (!res) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Shelter not found",
          });
        }

        const payload = {
          id: res.id,
          name: res.name,
          location: res.location,
          phone: res.phone,
          email: res.email,
          capacity: res.capacity,
          longitude: res.longitude,
          latitude: res.latitude,
          createdAt: res.created_at,
          updatedAt: res.updated_at,
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
  getShelterByName: baseProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      console.log("input", input);
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
  createShelter: baseProcedure
    .input(shelterSchema)
    .mutation(async ({ input }) => {
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

// const shelters = await prisma.shelter.findMany({
//   include: {
//     animals: true,
//     food: true,
//   },
// });

// const payload = {
//   shelters: shelters.map((shelter) => ({
//     id: shelter.id,
//     name: shelter.name,
//     location: shelter.location,
//     phone: shelter.phone,
//     email: shelter.email,
//     capacity: shelter.capacity,
//     longitude: shelter.longitude,
//     latitude: shelter.latitude,
//     createdAt: shelter.created_at,
//     updatedAt: shelter.updated_at,
//     animals: shelter.animals,
//     food: shelter.food,
//   })),
// };

// const shelterStuff = shelters.map((shelter) => shelterPayload(shelter));

// console.log("animals", animals);

// const animals = await prisma.animal.findMany({

// });
//   const payload = animals.map((animal) => animalPayload(animal));

// const animalPayload = shelters.map(());

// const payload = shelters.map((shelter) => shelterWithAnimalsAndFood(shelters, shelter.animals, shelter.foods));

// const payload = shelters.map((shelter) => shelterPayload(shelter));

// const payload = res.map(shelter => ({
//   id: shelter.id,
//   name: shelter.name,
//   location: shelter.location,
//   phone: shelter.phone,
//   email: shelter.email,
//   capacity: shelter.capacity,
//   longitude: shelter.longitude,
//   latitude: shelter.latitude,
//   createdAt: shelter.created_at,
//   updatedAt: shelter.updated_at,
// }));
