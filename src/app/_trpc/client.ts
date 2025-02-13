// import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

// export const trpc = createTRPCReact<AppRouter>({});
