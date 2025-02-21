import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { foodSchema } from "@/utils/schemas";
import { foodPayload } from "@/utils/helpers";

export const foodRouter = router({
  getFood: baseProcedure.query(async () => {
    try {
      const food = await prisma.food.findMany();
      return food;
    } catch (error) {
      console.error(error);
    }
  }),
  getFoodsByShelterId: baseProcedure
    .input(z.number())
    .query(async ({ input }) => {
      try {
        const food = await prisma.food.findMany({
          where: {
            shelter_id: input,
          },
        });

        const payload = food.map((food) => foodPayload(food));

        return payload;
      } catch (error) {
        console.error(error);
      }
    }),
  createFood: baseProcedure.input(foodSchema).mutation(async ({ input }) => {
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
      throw new Error("Error creating food: " + (error as Error).message);
    }
  }),
});

export default foodRouter;
