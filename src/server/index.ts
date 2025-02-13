import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getShelters: publicProcedure.query(async () => "Hello From server"),
  // getShelters: publicProcedure.query(async () => {
  //   return [1];
  // }),
});

export type AppRouter = typeof appRouter;
