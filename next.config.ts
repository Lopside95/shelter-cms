import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com", "images.dog.ceo"],
  },
};

export default nextConfig;

// headers: async () => {
//   return [
//     {
//       source: "/api/:path*",
//       headers: [
//         { key: "Access-Control-Allow-Credentials", value: "true" },
//         {
//           key: "Access-Control-Allow-Origin",
//           value: "http://localhost:3000",
//         },
//         {
//           key: "Access-Control-Allow-Methods",
//           value: "GET,DELETE,PATCH,POST,PUT",
//         },
//         {
//           key: "Access-Control-Allow-Headers",
//           value:
//             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//         },
//       ],
//     },
//   ];
// },
