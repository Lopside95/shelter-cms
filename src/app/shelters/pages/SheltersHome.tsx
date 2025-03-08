"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { shelterSchema, ShelterSchema } from "@/utils/schemas";
import TextField from "@/components/inputs/TextFormField";
import NumberField from "@/components/inputs/NumberField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/trpc/client";
import FindShelter from "@/components/FindShelter";
import ShelterCard from "@/components/cards/ShelterCard";
import { foodPayload, ShelterProps, ShelterWhole } from "@/utils/types";
import { Shelter } from "@prisma/client";
import { getHTTPStatusCodeFromError } from "@trpc/server/unstable-core-do-not-import";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AllFoodTable from "../components/AllFoodTable";

const SheltersHome = ({ shelters }: { shelters: ShelterWhole[] }) => {
  const router = useRouter();

  const form = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema),
    defaultValues: {
      name: "",
      location: "",
      phone: "",
      email: "",
      capacity: 0,
    },
  });

  const mutateFood = api.food.createFood.useMutation();
  const mutateAnimal = api.animals.createAnimal.useMutation();
  const makeFood = async () => {
    const res = await mutateFood.mutateAsync({
      name: "Chicken Pellets",
      type: "Dry",
      brand: "Hills ",
      quantity: 10,
      shelterId: 1,
    });

    return res;
  };

  const foodData = shelters.flatMap((shelter) =>
    shelter.food.map((foodItem) => ({
      ...foodItem,
      shelterName: shelter.name,
    }))
  );

  console.log("foodData", foodData);

  // const foodData = shelters.map((shelter) => {
  //   return {
  //     shelterName: shelter.name,
  //     food: shelter.food,
  //   };
  // });

  // console.log("foodData", foodData);

  // const food = foodData.flatMap((item) => item);

  // const food = foodData.flatMap((food) => food);

  // console.log("food", food);
  // const { data: food, isLoading } = api.food.getFood.useQuery();

  // const foodData = food?.data.map(foodPayload);

  // const foodData = food?.map(foodPayload);

  const addAnimal = async () => {
    try {
      const res = await mutateAnimal.mutateAsync({
        name: "Cat One",
        species: "CAT",
        age: 7,
        chipNumber: "1231233",
        shelterId: 1,
        breed: "Beagle",
        condition: "HEALTHY",
        image: "",
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleFindShelter = async (name: string) => {};

  const mutateShelter = api.shelters.createShelter.useMutation();

  const onSubmit: SubmitHandler<ShelterSchema> = async (
    data: ShelterSchema
  ) => {
    const res = await mutateShelter.mutateAsync(data);
    console.log("res", res);
    return res;
  };

  return (
    <div className=" flex flex-col items-center gap-5 py-10">
      {shelters.map((shelter) => {
        return <ShelterCard key={shelter.id} shelter={shelter} />;
      })}

      {/* <FindShelter>Hi</FindShelter> */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Find Shelter</CardTitle>
          <CardDescription>Search for a shelter by name</CardDescription>
        </CardHeader>
        <CardContent>
          {initialShelters.map((shelter) => (
            <p
              onClick={() => router.push(`shelters/${shelter.id}`)}
              key={shelter.id}
            >
              {shelter.name}
            </p>
          ))}
        </CardContent>
      </Card> */}
      <Card className=" w-3/4 px-20 mx-auto">
        <CardHeader>
          <CardTitle>Add a shelter</CardTitle>
          <CardDescription>
            Enter the details for the new animal shelter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap justify-between"
            >
              <TextField
                name="name"
                label="Shelter name"
                placeholder="Name of the shelter"
              />
              <TextField
                name="email"
                label="Email"
                placeholder="Enter email address"
              />
              <TextField
                name="location"
                label="Location"
                placeholder="Location"
              />
              <TextField
                name="phone"
                label="Phone number"
                placeholder="Enter phone number"
              />
              <NumberField name="capacity" label="Capacity" />

              <Button type="submit" className="w-80">
                Add
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <AllFoodTable
        food={foodData}
        // food={foodData[0].food}
        // shelterName={foodData[0].shelterName}
      />
      {/* {isLoading && <p>Loading Food...</p>} */}

      {/* <DataTable columns={columns} data={foodData ? foodData : []} /> */}

      <Button className="w-80" onClick={makeFood}>
        Make Food
      </Button>
      <div>Quick Data</div>
      <Button className="w-80" onClick={addAnimal}>
        Add animal
      </Button>

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

export default SheltersHome;
