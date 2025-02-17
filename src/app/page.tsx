import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { trpc } from "@/server/trpc/server";
import { HydrateClient } from "@/server/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TRPCProvider } from "./_trpc/client";

export default function Home() {
  void trpc.hello.prefetch({ text: "world" });

  return (
    <div>DIV DIV DIV</div>

    // <TRPCProvider>
    //   <HydrateClient>
    //     <ErrorBoundary fallback={<div>Something went wrong</div>}>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <div>Hello, waiting</div>
    //       </Suspense>
    //     </ErrorBoundary>
    //   </HydrateClient>
    // </TRPCProvider>
  );
}

// // import { ErrorBoundary } from "next/dist/client/components/error-boundary";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   void trpc.hello.prefetch({ text: "world" });

//   return (
//     <HydrateClient>
//       <div>...</div>
//       {/** ... */}
//       <ErrorBoundary fallback={<div>Something went wrong</div>}>
//         <Suspense fallback={<div>Loading...</div>}>
//           {/* {children} */}
//           <div>Hello, waiting</div>

//           {/* <ClientGreeting /> */}
//         </Suspense>
//       </ErrorBoundary>
//     </HydrateClient>
//   );
// }
