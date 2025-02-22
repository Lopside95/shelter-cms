import { z } from "zod";
import { procedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { animalSchema } from "@/utils/schemas";
import { animalPayload } from "@/utils/helpers";
import { TRPCClientError } from "@trpc/client";

export const animalsRouter = router({
  getAnimals: procedure.query(async ({ ctx }) => {
    try {
      const animals = await prisma.animal.findMany();

      const payload = animals.map((animal) => animalPayload(animal));
      return {
        message: "Animals fetched successfully",
        data: payload,
        // count: animals.length,
      };
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
      // const cause = theError.cause;
      // console.log("cause", cause);

      throw new Error(`Failed to create animal: ${(error as Error).message}`);
    }
  }),
  getAnimalById: procedure.input(z.number()).query(async ({ input }) => {
    console.log("input", input);

    try {
      const animal = await prisma.animal.findUnique({
        where: {
          id: input,
        },
      });

      if (!animal) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Animal not found",
        });
      }

      const payload = animalPayload(animal);

      return {
        message: "Animal fetched by id",
        data: payload,
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `TRPC ERROR IN GET BY ID: ${error.message}`,
          cause: error.cause,
          // name: ""
        });
      }
      console.error({ "Error from getAnimalById": error });
    }
  }),
  getAnimalsByShelterId: procedure
    .input(z.number())
    .query(async ({ input }) => {
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
  createAnimal: procedure
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
        // const cause = theError.cause;
        // console.log("cause", cause);

        throw new Error(`Failed to create animal: ${(error as Error).message}`);
      }
    }),
});

export default animalsRouter;
