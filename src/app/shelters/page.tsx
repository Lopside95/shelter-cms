import { trpc } from "@/server/trpc/server";
import CreateShelter from "./components/CreateShelter";
// import { api } from "@/trpc/server";

export default async function ShelterPage() {
  // Fetch initial data on the server
  const shelters = await trpc.getShelters();

  // const shelters = await api.getAllShelters.query();

  return <CreateShelter initialShelters={shelters} />;
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { shelterSchema, ShelterSchema } from "@/utils/schemas";
// import TextField from "@/components/TextFormField";
// import NumberField from "@/components/NumberField";
// import FindShelter from "@/components/FindShelter";
// import TextInput from "@/components/TextInput";
// import { useState } from "react";
// import { api } from "../trpc/client";
// import { Shelter } from "@prisma/client";

// const CreateShelter = () => {
//   const [toSearch, setToSearch] = useState<string>("");

//   // const [shelter, setShelter] = useState<Shelter>();

//   const form = useForm<ShelterSchema>({
//     resolver: zodResolver(shelterSchema),
//     defaultValues: {
//       name: "",
//       location: "",
//       phone: "",
//       email: "",
//       capacity: 0,
//     },
//   });

//   const shelter = api.getShelterByName.useQuery(toSearch);
//   const handleFindShelter = async (name: string) => {};

//   const onSubmit = (data: ShelterSchema) => {
//     console.log(data);
//     // Handle form submission here
//   };

//   return (
//     <div className=" mx-auto py-10">
//       <Card className=" w-3/4 px-20 mx-auto">
//         <CardHeader>
//           <CardTitle>Create New Shelter</CardTitle>
//           <CardDescription>
//             Enter the details for the new animal shelter.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="flex flex-wrap"
//             >
//               <TextField
//                 name="name"
//                 label="Shelter name"
//                 placeholder="Name of the shelter"
//               />
//               <TextField
//                 name="location"
//                 label="Location"
//                 placeholder="Location"
//               />
//               <TextField
//                 name="phone"
//                 label="Phone number"
//                 placeholder="Enter phone number"
//               />
//               <TextField
//                 name="email"
//                 label="Email"
//                 placeholder="Enter email address"
//               />
//               <NumberField name="capacity" label="Capacity" />

//               <Button type="submit" className="w-full">
//                 Create Shelter
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>

//       <FindShelter>
//         <TextInput
//           name="shelterName"
//           onChange={(e) => setToSearch(e.target.value)}
//         />
//         <p>{shelter.data?.name}</p>
//         {/* {shelter.data?.map((shelter) => (
//           <p key={shelter.id}>{shelter.name}</p>
//         ))} */}
//       </FindShelter>
//     </div>
//   );
// };

// export default CreateShelter;

// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Shelter } from "@/utils/types";
// // import { useEffect, useRef, useState } from "react";
// // import { api, TRPCProvider } from "../trpc/client";
// // import { get } from "http";
// // import { Form } from "react-hook-form";

// // const Home = () => {
// //   const [shelters, setShelters] = useState<Shelter[] | null>(null);

// //   const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

// //   const [toSearch, setToSearch] = useState<string>("");

// //   const formVal = useRef<HTMLInputElement>(null);

// //   const { data: shelt } = api.getShelters.useQuery();

// //   const singleShelter = api.getShelterByName.useQuery(toSearch);

// //   const utils = api.useUtils();

// //   return (
// //     <main className="flex flex-col items-center align-middle ">
// //       <h1>Welcome to the Shelters page</h1>
// //       <Input className="w-80" onChange={(e) => setToSearch(e.target.value)} />
// //       <Button
// //         onClick={() => {
// //           singleShelter.refetch();
// //           console.log(singleShelter);
// //         }}
// //       >
// //         Get shelter by name
// //       </Button>
// //     </main>
// //   );
// // };

// // export default Home;
