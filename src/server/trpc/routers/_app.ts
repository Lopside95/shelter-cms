import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";
import { get } from "http";
import { TRPCError } from "@trpc/server";
import { itemSchema } from "@/utils/schemas";

export const appRouter = router({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  getShelters: baseProcedure.query(async ({ ctx }) => {
    try {
      const res = await prisma.shelter.findMany();
      console.log("res", res);
      return res;
    } catch (error) {
      console.error(error);
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
  createItem: baseProcedure
    .input(itemSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = input;

        console.log("ctx", ctx);

        const newItem = await prisma.item.create({
          data: {
            item_name: data.itemName,
            quantity: data.quantity,
          },
        });

        return newItem;
      } catch (error) {
        console.error(error);
      }
    }),

  // getShelter: baseProcedure.input(shelter).query((id) => {
  //   return {
  //     shelter: {
  //       where: {
  //         id: shelter.id,
  //       }
  //     }
  //   };
  // }),
});

export type AppRouter = typeof appRouter;
