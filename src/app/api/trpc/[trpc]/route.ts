import { createTRPCContext } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/routers/_app";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts;
      console.error("Error:", error);
      if (error.code === "INTERNAL_SERVER_ERROR") {
      }
    },

    // onError: (opts) => {
    //   console.error("TRPC error", opts);
    //   console.log("opts", opts);
    // },
  });
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
