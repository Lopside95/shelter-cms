import { z } from "zod";
import { baseProcedure, router } from "@/server/trpc/init";
import { shelter } from "@/utils/types";

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
