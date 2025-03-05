"use client";

import { FoodProps } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Check,
  CheckSquare,
  EditIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { api } from "@/app/trpc/client";
import { on } from "events";
import { FoodSchema } from "@/utils/schemas";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const FoodTable = ({ food }: { food: FoodProps[] }) => {
  const brands = food.map((item) => item.brand);

  // const foodMutation = api.food.updateFood.useMutation({
  //   onSuccess: () => {
  //     console.log("Food updated successfully");
  //   },
  // });

  const [newFood, setNewFood] = useState();

  const mutateFood = api.food.updateFood.useMutation();

  // const handleFoodUpdate = async (item: FoodSchema, index: number) => {
  //   const { quantity, name, brand, type, id } = item;

  //   try {
  //     // const updatedFood = {
  //     const res = await foodMutation.mutateAsync({
  //       quantity,
  //       name,
  //       brand,
  //       type,
  //       id,
  //       shelterId: item.shelterId,

  //       // shelterId: food[index].shelterId,
  //     });
  //     return res?.data;
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // try {
  //   //   await foodMutation.mutateAsync();
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };
  const handleFood = async () => {};

  return (
    <div>
      <Table className="w-3/4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {food.map((item, index) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="w-20"
                    defaultValue={item.quantity}
                    // onChange={(e) => handleFoodUpdate(e, item.id)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    // value={item.quantity}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={handleFood}>Save</Button>
                  {/* <CheckSquare onClick={() => handleFoodUpdate(item, index)} /> */}
                  <Trash2 />
                </TableCell>
                {/* <Button onClick={handleFoodUpdate}>Update</Button> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FoodTable;

// Dialog>
//                     <DialogTrigger asChild>
//                       <Button variant="outline">Edit Item</Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Edit profile</DialogTitle>
//                         <DialogDescription>
//                           Make changes to your profile here. Click save when
//                           you&apos;re done.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                           <Label htmlFor="name" className="text-right">
//                             Name
//                           </Label>
//                           <Input
//                             id="name"
//                             value="Pedro Duarte"
//                             className="col-span-3"
//                           />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                           <Label htmlFor="username" className="text-right">
//                             Brand
//                           </Label>
//                           <Input
//                             id="username"
//                             value="@peduarte"
//                             className="col-span-3"
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button onClick={handleFoodUpdate}>Update</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>

{
  /* <Accordion type="single" collapsible>
{food.map((item) => {
  return (
    <AccordionItem key={item.brand} value="item-1">
      <AccordionTrigger>{item.brand}</AccordionTrigger>
      <AccordionContent>{item.name}</AccordionContent>
    </AccordionItem>
  );
})}
</Accordion> */
}
