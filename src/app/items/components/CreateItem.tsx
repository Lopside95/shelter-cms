"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { itemSchema, ItemSchema } from "@/utils/schemas";
import TextField from "@/components/inputs/TextFormField";
import NumberField from "@/components/inputs/NumberField";
import { useState } from "react";
import { api } from "@/app/trpc/client";

const CreateItem = ({ items }: { items: ItemSchema[] }) => {
  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: "",
      quantity: 0,
    },
  });

  // const [photo, setPhoto] = useState<string | null>(null);

  // const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const url = await uploadPhoto(file, `animals`);
  //     setPhoto(url);
  //   }
  // };

  const createItem = api.items.createItem.useMutation();

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    try {
      const res = await createItem.mutateAsync(data);
      return res;
    } catch (error) {
      console.error(error);
    }

    console.log(data);
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
    </div>
  );
};

export default CreateItem;
