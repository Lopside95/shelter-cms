"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import TextField from "./TextFormField";
import NumberField from "./NumberField";
import { Button } from "../ui/button";
import { FoodSchema } from "@/utils/schemas";
import { api } from "@/app/trpc/client";
import { FoodProps } from "@/utils/types";
import { use, useEffect } from "react";

type FoodUpdateFormProps = {
  foodId: number;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (isOpen: boolean) => void;
  selectedFood: FoodProps | null;
};

const FoodUpdateForm = ({
  foodId,
  isDialogOpen,
  setIsDialogOpen,
  selectedFood,
}: FoodUpdateFormProps) => {
  const form = useForm<FoodProps>({
    defaultValues: {
      id: foodId,
      name: selectedFood?.name || "",
      brand: selectedFood?.brand || "",
      quantity: selectedFood?.quantity || 0,
      shelterId: selectedFood?.shelterId || 0,
      type: selectedFood?.type || "",
    },
  });

  useEffect(() => {
    if (selectedFood) {
      form.reset({
        id: foodId,
        name: selectedFood.name,
        brand: selectedFood.brand,
        quantity: selectedFood.quantity,
        shelterId: selectedFood.shelterId,
        type: selectedFood.type,
      });
    }
  }, [selectedFood, foodId, form]);

  const mutateFood = api.food.updateFood.useMutation();

  const onSubmit: SubmitHandler<FoodProps> = async (data: FoodProps) => {
    try {
      const res = await mutateFood.mutateAsync(data, {
        onSuccess: () => {
          alert("Food updated successfully");
        },
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const errors = form.formState.errors;
  console.log("errors", errors);

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Food Item</DialogTitle>
                <DialogDescription>
                  Update the details for this food item. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  {selectedFood?.id}
                  <TextField
                    name="name"
                    label="Name"
                    placeholder={selectedFood?.name}
                  />
                </div>
                <div className="grid gap-2">
                  <TextField
                    name="brand"
                    label="Brand"
                    placeholder={selectedFood?.brand}
                  />
                </div>
                <div className="grid gap-2">
                  <NumberField
                    name="quantity"
                    label="Quantity"
                    defVal={selectedFood?.quantity}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </FormProvider>
    </>
  );
};

export default FoodUpdateForm;
