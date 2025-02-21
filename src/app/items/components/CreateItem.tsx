"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  itemSchema,
  ItemSchema,
  shelterSchema,
  ShelterSchema,
} from "@/utils/schemas";
import TextField from "@/components/TextFormField";
import NumberField from "@/components/NumberField";
import FindShelter from "@/components/FindShelter";
import TextInput from "@/components/TextInput";
import { use, useState } from "react";
import { Shelter } from "@prisma/client";
import { Item } from "@/utils/types";
import { api } from "@/app/trpc/client";

const CreateItem = ({ items }: { items: Item[] }) => {
  const [toSearch, setToSearch] = useState<string>("");

  // const [shelter, setShelter] = useState<Shelter>();

  console.log("items", items);

  // const [shelters, setShelters] = useState<Shelter[] | null>(null);

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: "",
      quantity: 0,
    },
  });

  //   const shelter = api.getShelterByName.useQuery(toSearch);
  const handleFindShelter = async (name: string) => {};

  const createItem = api.items.createItem.useMutation();

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    try {
      const res = await createItem.mutateAsync(data);
      return res;
    } catch (error) {
      console.error(error);
    }

    console.log(data);
    // Handle form submission here
  };

  return (
    <div className=" mx-auto py-10">
      <Card className=" w-3/4 px-20 mx-auto">
        <CardHeader>
          <CardTitle>Create New Item</CardTitle>
          <CardDescription>Enter the details for the Item.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap"
            >
              <TextField
                name="itemName"
                label="Item name"
                placeholder="Name of the item"
              />

              <NumberField name="quantity" label="Qauntity" />

              <Button type="submit" className="w-80">
                Create Item
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <FindShelter>
        <TextInput
          name="shelterName"
          onChange={(e) => setToSearch(e.target.value)}
        />
        <p>{shelter.data?.name}</p>
        {shelter.data?.map((shelter) => (
          <p key={shelter.id}>{shelter.name}</p>
        ))}
      </FindShelter> */}
    </div>
  );
};

export default CreateItem;

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Shelter } from "@/utils/types";
// import { useEffect, useRef, useState } from "react";
// import { api, TRPCProvider } from "../trpc/client";
// import { get } from "http";
// import { Form } from "react-hook-form";

// const Home = () => {
//   const [shelters, setShelters] = useState<Shelter[] | null>(null);

//   const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

//   const [toSearch, setToSearch] = useState<string>("");

//   const formVal = useRef<HTMLInputElement>(null);

//   const { data: shelt } = api.getShelters.useQuery();

//   const singleShelter = api.getShelterByName.useQuery(toSearch);

//   const utils = api.useUtils();

//   return (
//     <main className="flex flex-col items-center align-middle ">
//       <h1>Welcome to the Shelters page</h1>
//       <Input className="w-80" onChange={(e) => setToSearch(e.target.value)} />
//       <Button
//         onClick={() => {
//           singleShelter.refetch();
//           console.log(singleShelter);
//         }}
//       >
//         Get shelter by name
//       </Button>
//     </main>
//   );
// };

// export default Home;
