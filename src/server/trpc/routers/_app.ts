import { z } from "zod";
import { baseProcedure, router } from "@/server/trpc/init";

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
});

export type AppRouter = typeof appRouter;
