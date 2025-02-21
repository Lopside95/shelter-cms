import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";
import { TRPCError } from "@trpc/server";
import { animalSchema } from "@/utils/schemas";
import { animalPayload } from "@/utils/helpers";

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

        // const animalsPayload = animals?.map((animal) => ({
        //   id: animal.id,
        //   name: animal.name,
        //   species: animal.species,
        //   breed: animal.breed,
        //   age: animal.age,
        //   chipNumber: animal.chip_number,
        //   shelterId: animal.shelter_id,
        //   createdAt: animal.created_at,
        //   updatedAt: animal.updated_at,
        // }));

        const payload = animals.map((animal) => animalPayload(animal));
        return payload;
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
            shelter_id: input.shelterId,
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
