import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { animalSchema } from "@/utils/schemas";
import { animalPayload } from "@/utils/helpers";
import { TRPCClientError } from "@trpc/client";

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
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `TRPC ERROR: ${error.message}`,
          });
        }
        if (error instanceof TRPCClientError) {
          throw new TRPCClientError(
            ("There was an error: " + error.message) as string
          );
        }

        const theError = error as Error;
        console.log("theError", theError);
        const cause = theError.cause;
        console.log("cause", cause);

        throw new Error(`Failed to create animal: ${(error as Error).message}`);
      }
    }),
});

export default animalsRouter;
