import { z } from "zod";
import { procedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { animalSchema } from "@/utils/schemas";
import { TRPCClientError } from "@trpc/client";
import { animalPayload, shelterPayload } from "@/utils/types";
import { PrismaClient } from "@prisma/client";
import { get } from "http";

const getShelterIdByAnimal = async (animalId: number, prisma: PrismaClient) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        id: animalId,
      },
    });

    if (!animal) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Animal not found",
      });
    }

    if (!animal?.shelter_id) {
      return null;
    }

    const shelterId = animal?.shelter_id;
    return shelterId;
  } catch (error) {
    console.error(error);
  }
};

const getAnimalById = async (animalId: number, prisma: PrismaClient) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        id: animalId,
      },
    });

    if (!animal) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Animal not found",
      });
    }

    return {
      message: "Animal fetched by id",
      data: animal,
      code: 200,
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `TRPC ERROR IN GET BY ID: ${error.message}`,
        cause: error.cause,
      });
    }
    console.error({ "Couldn't fetch animal by ID": error });
  }
};

export const animalsRouter = router({
  getAnimals: procedure.query(async ({ ctx }) => {
    try {
      const animals = await prisma.animal.findMany();

      const payload = animals.map((animal) => animalPayload(animal));

      return {
        message: "Animals fetched successfully",
        data: payload,
        count: animals.length,
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

      console.error(error);
    }
  }),
  getAnimalsAndShelters: procedure.query(async ({ ctx }) => {
    try {
      const animals = await prisma.animal.findMany({
        include: {
          shelter: true,
        },
      });

      const payload = animals.map((animal) => {
        return {
          animal: animalPayload(animal),
          shelter: animal.shelter ? shelterPayload(animal.shelter) : null,
        };
      });
      return {
        message: "Animals fetched successfully",
        data: payload,
        count: animals.length,
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

      throw new Error(`Failed to create animal: ${(error as Error).message}`);
    }
  }),
  getAnimalById: procedure.input(z.number()).query(async ({ input }) => {
    try {
      const animal = await prisma.animal.findUnique({
        where: {
          id: input,
        },
        include: {
          shelter: true,
        },
      });

      if (!animal) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Animal not found",
        });
      }

      const animalDetails = animalPayload(animal);
      const shelterDetails = animal.shelter
        ? shelterPayload(animal.shelter)
        : null;

      const payload = {
        animal: animalDetails,
        shelter: shelterDetails,
      };

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
        const existingAnimal = await prisma.animal.findUnique({
          where: {
            chip_number: input.chipNumber,
          },
        });

        if (existingAnimal) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An animal with that chip number already exists.",
          });
        }
        const newAnimal = await prisma.animal.create({
          data: {
            chip_number: input.chipNumber,
            name: input.name,
            species: input.species,
            breed: input.breed,
            age: input.age,
            shelter_id: input.shelterId,
            image: input.image || "",
            condition: input.condition || "HEALTHY",
          },
        });

        return newAnimal;
      } catch (error: unknown) {
        // const httpCode = getHTTPStatusCodeFromError(error as TRPCError);
        // console.log("httpCode", httpCode);
        if (error instanceof TRPCError) {
          if (error.code === "CONFLICT") {
            throw new TRPCError({
              code: "CONFLICT",
              message: `An animal with that chip number already exists.`,
              cause: error.cause,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `TRPC ERROR: ${error.message}`,
          });
        }
        if (error instanceof TRPCClientError) {
          throw new TRPCClientError(
            ("There was a TRPCClientError, error message: " +
              error.message) as string,
            error.meta
          );
        }

        const theError = error as Error;
        console.log("theError", theError);

        throw new Error(`Failed to create animal: ${(error as Error).message}`);
      }
    }),
  deleteAnimal: procedure.input(z.number()).mutation(async ({ input }) => {
    try {
      const animal = await getAnimalById(input, prisma);

      if (!animal?.data.shelter_id) {
        const deletedAnimal = await prisma.animal.delete({
          where: {
            id: input,
          },
        });

        return {
          message: "Animal deleted successfully",
          data: deletedAnimal,
          code: 200,
        };
      }

      const shelter = await getShelterIdByAnimal(animal?.data.id, prisma);

      if (shelter) {
        await prisma.shelter.update({
          where: {
            id: shelter,
          },
          data: {
            animals: {
              disconnect: {
                id: input,
              },
            },
          },
        });
      }

      const deletedAnimal = await prisma.animal.delete({
        where: {
          id: input,
        },
      });

      return {
        message: "Animal deleted successfully",
        data: deletedAnimal,
        code: 200,
      };
    } catch (error) {
      console.error(error);
    }
  }),

  getShelterByAnimalId: procedure.input(z.number()).query(async ({ input }) => {
    try {
      const shelterId = await getShelterIdByAnimal(input, prisma);

      if (!shelterId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shelter not found",
        });
      }

      const shelter = await prisma.shelter.findUnique({
        where: {
          id: shelterId,
        },
      });

      return {
        message: "Shelter fetched by animal id",
        data: shelter,
        code: 200,
      };
    } catch (error) {
      console.error(error);
    }
  }),
});

export default animalsRouter;
