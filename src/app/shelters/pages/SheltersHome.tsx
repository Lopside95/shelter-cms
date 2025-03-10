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
import { ShelterProps } from "@/utils/types";
import { Shelter } from "@prisma/client";
import { getHTTPStatusCodeFromError } from "@trpc/server/unstable-core-do-not-import";

const SheltersHome = ({ shelters }: { shelters: ShelterProps[] }) => {
  const [toSearch, setToSearch] = useState<string>("");

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
      name: "Chicken Bits",
      type: "Wet",
      brand: "Butternut Box",
      quantity: 10,
      shelterId: 1,
    });

    return res;
  };

  const addAnimal = async () => {
    try {
      const res = await mutateAnimal.mutateAsync({
        name: "Steve",
        species: "DOG",
        age: 7,
        chipNumber: "123",
        shelterId: 1,
        breed: "Beagle",
        condition: "HEALTHY",
        image: "https://images.dog.ceo/breeds/african/images.jpg",
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
      <Button className="w-80" onClick={makeFood}>
        Make Food
      </Button>
      <div>TESTING</div>
      <Button className="w-80" onClick={addAnimal}>
        Add animal
      </Button>

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
          <CardTitle>Create New Shelter</CardTitle>
          <CardDescription>
            Enter the details for the new animal shelter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap"
            >
              <TextField
                name="name"
                label="Shelter name"
                placeholder="Name of the shelter"
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
              <TextField
                name="email"
                label="Email"
                placeholder="Enter email address"
              />
              <NumberField name="capacity" label="Capacity" />

              <Button type="submit" className="w-full">
                Create Shelter
              </Button>
            </form>
          </FormProvider>
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

export default SheltersHome;
