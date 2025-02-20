import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";
import { get } from "http";
import { TRPCError } from "@trpc/server";
import { itemSchema } from "@/utils/schemas";
import itemsRouter from "./items";

export const appRouter = router({
  items: itemsRouter,
  getShelters: baseProcedure.query(async ({ ctx }) => {
    try {
      const res = await prisma.shelter.findMany();
      return res;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to fetch shelters",
      });
    }
  }),
  getShelterByName: baseProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
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
  createShelter: baseProcedure.input(shelter).mutation(async ({ input }) => {
    try {
      const data = input;

      const newShelter = await prisma.shelter.create({
        data: {
          capacity: data.capacity,
          name: data.name,
          location: data.location,
          created_at: data.createdAt,
          updated_at: data.updatedAt,
          phone: data.phone,
          email: data.email,
          longitude: data.longitude,
          latitude: data.latitude,
          animals: data?.animals
            ? {
                create: data.animals.map((animal) => ({
                  ...animal,
                  chip_number: animal.chipNumber,
                })),
              }
            : undefined,
          foods: data.foods
            ? {
                create: data.foods.map((food) => ({
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
  getMessage: baseProcedure.query(async ({ ctx }) => {
    try {
      return { message: "This is a test message" };
    } catch (error) {
      if (error instanceof TRPCError) {
        console.error(error.message);
      }
      console.error(error);
    }
  }),
});

export type AppRouter = typeof appRouter;
