import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { foodSchema } from "@/utils/schemas";

export const foodRouter = router({
  getFoods: baseProcedure.query(async ({ ctx }) => {
    try {
      const foods = await prisma.food.findMany();
      return foods;
    } catch (error) {
      console.error(error);
    }
  }),
  getFoodsByShelterId: baseProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      try {
        const foods = await prisma.food.findMany({
          where: {
            shelter_id: input,
          },
        });
        return foods;
      } catch (error) {
        console.error(error);
      }
    }),
  createFood: baseProcedure
    .input(foodSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const newFood = await prisma.food.create({
          data: {
            name: input.name,
            type: input.type,
            brand: input.brand,
            quantity: input.quantity,
            shelter_id: input.shelterId,
          },
        });

        return newFood;
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

export default foodRouter;
