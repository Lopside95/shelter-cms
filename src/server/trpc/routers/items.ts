import { baseProcedure, prisma, router } from "@/server/trpc/init";
import { TRPCError } from "@trpc/server";
import { itemSchema } from "@/utils/schemas";

export const itemsRouter = router({
  getItems: baseProcedure.query(async () => {
    try {
      const items = await prisma.item.findMany();

      const payload = items.map((item) => {
        return {
          id: item.id,
          itemName: item.item_name,
          quantity: item.quantity,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      });

      return payload;
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

  createItem: baseProcedure.input(itemSchema).mutation(async ({ input }) => {
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
});

export default itemsRouter;
