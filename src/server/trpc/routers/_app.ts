import itemsRouter from "./items";
import sheltersRouter from "./shelters";
import animalsRouter from "./animals";
import { router } from "../init";
import foodRouter from "./food";

export const appRouter = router({
  items: itemsRouter,
  shelters: sheltersRouter,
  animals: animalsRouter,
  food: foodRouter,
});

export type AppRouter = typeof appRouter;
