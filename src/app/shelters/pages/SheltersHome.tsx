"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
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
import TextField from "@/components/TextFormField";
import NumberField from "@/components/NumberField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/trpc/client";
import FindShelter from "@/components/FindShelter";
import ShelterCard from "@/components/ShelterCard";
import { ShelterProps } from "@/utils/types";
import { Shelter } from "@prisma/client";

const SheltersHome = ({ shelters }: { shelters: ShelterProps[] }) => {
  const [toSearch, setToSearch] = useState<string>("");

  const router = useRouter();

  // const convertedShelters = shelters.map((shelter) => )

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
    <div className=" flex flex-col gap-5 py-10">
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
          <CardTitle>Create New Shelter</CardTitle>
          <CardDescription>
            Enter the details for the new animal shelter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
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

export default SheltersHome;
