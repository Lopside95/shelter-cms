import { z } from "zod";
import { procedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { foodSchema } from "@/utils/schemas";
import { foodPayload } from "@/utils/types";

export const foodRouter = router({
  getFood: procedure.query(async () => {
    try {
      const food = await prisma.food.findMany();
      return food;
    } catch (error) {
      console.error(error);
    }
  }),
  getFoodsByShelterId: procedure.input(z.number()).query(async ({ input }) => {
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
  createFood: procedure.input(foodSchema).mutation(async ({ input }) => {
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

      const foodError = error as Error;

      const errData = {
        msg: foodError.message,
        cause: foodError.cause,
        name: foodError.name,
      };

      throw new Error("Error creating food: " + foodError.message);
    }
  }),
});

export default foodRouter;
