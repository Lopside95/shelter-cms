import { z } from "zod";
import { procedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { foodSchema } from "@/utils/schemas";
import { foodPayload } from "@/utils/types";

export const foodRouter = router({
  getFood: procedure.query(async () => {
    try {
      const food = await prisma.food.findMany();
      return {
        data: food,
        count: food.length,
        code: 200,
      };
    } catch (error: unknown) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to fetch food",
        });
      }
      console.error(error);
    }
  }),
  getFoodById: procedure.input(z.number()).query(async ({ input }) => {
    try {
      const food = await prisma.food.findUnique({
        where: {
          id: input,
        },
      });
      return {
        data: food,
        code: 200,
      };
    } catch (error: unknown) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to fetch food",
        });
      }
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

      return {
        food: payload,
        count: payload.length,
        code: 200,
      };
    } catch (error: unknown) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to fetch food",
        });
      }
      console.error(error);
    }
  }),
  createFood: procedure.input(foodSchema).mutation(async ({ input }) => {
    try {
      const newFood = await prisma.food.create({
        data: {
          name: input.name,
          type: input.type || "",
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
  updateFood: procedure.input(foodSchema).mutation(async ({ input }) => {
    try {
      const food = await prisma.food.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!food) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Food not found",
        });
      }

      const updatedFood = await prisma.food.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          name: input.name,
          type: input.type,
          brand: input.brand,
          quantity: input.quantity,
          shelter_id: input.shelterId,
          updated_at: new Date(),
        },
      });

      // return updatedFood;

      return {
        data: updatedFood,
        code: 200,
        message: "Food updated successfully",
      };

      // const payload = foodPayload(food);

      // return payload;
    } catch (error: unknown) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to fetch food",
        });
      }
      console.error(error);
    }
  }),
});

export default foodRouter;
