"use client";

import { api } from "@/app/trpc/client";
import NumberField from "@/components/inputs/NumberField";
import TextField from "@/components/inputs/TextFormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { uploadPhoto } from "@/utils/helpers";
import { AnimalSchema, animalSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const AddAnimalForm = ({ shelterId }: { shelterId: number }) => {
  const form = useForm<AnimalSchema>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      age: 0,
      shelterId: shelterId,
      chipNumber: "",
      image: "",
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const animalName = form.watch("name");

  const mutateAnimal = api.animals.createAnimal.useMutation();

  const onSubmit: SubmitHandler<AnimalSchema> = async (data: AnimalSchema) => {
    try {
      if (file !== null) {
        const url = await uploadPhoto(file, `/images/${animalName}`);
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
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>
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

          <Button type="submit">Add Animal</Button>
        </Card>
      </form>
    </FormProvider>
  );
};

export default AddAnimalForm;
