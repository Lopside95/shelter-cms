import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";
import { TRPCError } from "@trpc/server";
import { animalSchema } from "@/utils/schemas";

export const animalsRouter = router({
  getAnimals: baseProcedure.query(async ({ ctx }) => {
    try {
      const animals = await prisma.animal.findMany();
      return animals;
    } catch (error) {
      console.error(error);
    }
  }),
  getAnimalsByShelterId: baseProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      try {
        const animals = await prisma.animal.findMany({
          where: {
            shelter_id: input,
          },
        });
        // const payload = {};
        return animals;
      } catch (error) {
        console.error(error);
      }
    }),
  createAnimal: baseProcedure
    .input(animalSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const newAnimal = await prisma.animal.create({
          data: {
            chip_number: input.chipNumber,
            name: input.name,
            species: input.species,
            breed: input.breed,
            age: input.age,
          },
        });

        return newAnimal;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `TRPC ERROR: ${error.message}`,
          });
        }
        console.error(error);
      }
    }),
});

export default animalsRouter;
