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
import { Shelter } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "@/app/trpc/client";

const CreateShelter = ({ initialShelters }: { initialShelters: Shelter[] }) => {
  const [toSearch, setToSearch] = useState<string>("");

  console.log("initialShelters", initialShelters);

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

  const handleFindShelter = async (name: string) => {};

  const mutateShelter = api.shelters.createShelter.useMutation();

  const onSubmit: SubmitHandler<ShelterSchema> = async (
    data: ShelterSchema
  ) => {
    const res = await mutateShelter.mutateAsync(data);
    console.log(data);
    return res;
  };

  return (
    <div className=" mx-auto py-10">
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
      <Card>
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

export default CreateShelter;
