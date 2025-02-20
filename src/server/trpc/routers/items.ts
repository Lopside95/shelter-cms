import { z } from "zod";
import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";
import { TRPCError } from "@trpc/server";
import { itemSchema } from "@/utils/schemas";

export const itemsRouter = router({
  getItems: baseProcedure.query(async ({ ctx }) => {
    try {
      const items = await prisma.item.findMany();
      return items;
    } catch (error) {
      console.error(error);
    }
  }),

  createItem: baseProcedure
    .input(itemSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = input;

        const newItem = await prisma.item.create({
          data: {
            item_name: data.itemName,
            quantity: data.quantity,
          },
        });

        return newItem;
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

export default itemsRouter;
// export type AppRouter = typeof appRouter;
