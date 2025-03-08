"use client";

import { api } from "@/app/trpc/client";
import ImageUpload from "@/components/ImageUpload";
import NumberField from "@/components/inputs/NumberField";
import TextField from "@/components/inputs/TextFormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { uploadPhoto } from "@/utils/helpers";
import { AnimalSchema, animalSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Condition } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type ShelterData = {
  shelterId: number;
  shelterName: string;
  animalsLength: number;
};

const AddAnimalForm = ({
  shelterId,
  shelterName,
  animalsLength,
}: ShelterData) => {
  const form = useForm<AnimalSchema>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      name: "Athena2",
      condition: "HEALTHY",
      // species: "",
      species: "DOG",
      breed: "Africanis",
      age: 7,
      shelterId: shelterId,
      chipNumber: "32149-ud1208",
      image: "",
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const animalName = form.watch("name");

  const mutateAnimal = api.animals.createAnimal.useMutation();

  const onSubmit: SubmitHandler<AnimalSchema> = async (data: AnimalSchema) => {
    try {
      if (file !== null) {
        const url = await uploadPhoto(
          file,
          `/images/${shelterId}/${animalName}/${file.name}`
        );

        data.image = url;
      }

      const res = await mutateAnimal.mutateAsync(data);

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="flex p-4 flex-wrap gap-4">
          <TextField
            name="name"
            label="Animal Name"
            placeholder="Name of the animal"
          />
          <TextField name="species" label="Species" placeholder="Species" />
          <TextField name="breed" label="Breed" placeholder="Breed" />
          <TextField
            name="chipNumber"
            label="Chip Number"
            placeholder="Chip Number"
          />
          <NumberField name="age" label="Age" placeholder="Age" />
          <NumberField name="shelterId" label="Shelter" />
          {Object.values(Condition).map((condition) => (
            <label key={condition} className="flex items-center">
              <Input
                type="radio"
                value={condition}
                {...form.register("condition")}
              />
              {condition}
            </label>
          ))}
          <div className="">
            <ImageUpload file={file || undefined} setFile={setFile} />
          </div>

          <Button type="submit">Add Animal</Button>
        </Card>
      </form>
    </FormProvider>
  );
};

export default AddAnimalForm;
