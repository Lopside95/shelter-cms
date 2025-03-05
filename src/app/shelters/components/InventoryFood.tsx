"use client";

import type React from "react";

import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, ChevronDown, ArrowUpDown } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/inputs/TextFormField";
import NumberField from "@/components/inputs/NumberField";
import { FoodSchema } from "@/utils/schemas";
import { api } from "@/app/trpc/client";
import { FoodProps } from "@/utils/types";

// Types
// interface FoodProps {
//   id: string | number;
//   name: string;
//   brand: string;
//   quantity: number;
//   shelterId: number;
//   //   shelterName: string;
//   updatedAt: Date;
// }

// interface FoodInventoryTableProps {
//   food: FoodProps[];
//   onUpdateFood: (id: string | number, updatedData: Partial<FoodProps>) => void;
// }

const SingleShelterFood = ({ food }: { food: FoodProps[] }) => {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShelter, setSelectedShelter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof FoodProps>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const shelters = Array.from(new Set(food.map((item) => item.shelterId)));

  const filteredAndSortedItems = food
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleRowClick = (food: FoodProps) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };

  const form = useForm<FoodProps>({
    defaultValues: {
      name: "",
      brand: "",
      quantity: 0,
      shelterId: 0,
      type: "",
    },
  });

  const mutateFood = api.food.updateFood.useMutation();

  const onSubmit: SubmitHandler<FoodSchema> = async (data: FoodSchema) => {
    try {
      const res = await mutateFood.mutateAsync(data);

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field: keyof FoodProps) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getQuantityStatus = (quantity: number) => {
    if (quantity <= 5) return { label: "Low", variant: "destructive" as const };
    if (quantity <= 20) return { label: "Medium", variant: "warning" as const };
    return { label: "Good", variant: "success" as const };
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2">
              <div className="mb-2 text-xs font-medium">Shelter</div>
              <Select
                value={selectedShelter}
                onValueChange={setSelectedShelter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shelter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shelters</SelectItem>
                  {shelters.map((shelter) => (
                    <SelectItem key={shelter} value={shelter}>
                      {shelter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("brand")}
                >
                  Brand
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("shelterId")}
                >
                  Shelter
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div
                  className="flex items-center justify-end cursor-pointer"
                  onClick={() => handleSort("updatedAt")}
                >
                  Last Updated
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((food) => {
                const status = getQuantityStatus(food.quantity);
                return (
                  <TableRow
                    key={food.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(food)}
                  >
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell>{food.brand}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <Badge className="mr-2">{status.label}</Badge>
                        {/* <Badge variant={status.variant} className="mr-2">
                          {status.label}
                        </Badge> */}
                        {food.quantity}
                      </div>
                    </TableCell>
                    <TableCell>{food.shelterId}</TableCell>
                    <TableCell className="text-right">
                      {format(new Date(food.updatedAt), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No food items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
                  <TextField
                    //   id="name"
                    name="name"
                    label="Name"

                    //   value={formData.name || ""}
                    //   onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <TextField name="brand" label="Brand" />
                </div>
                <div className="grid gap-2">
                  <NumberField name="quantity" label="Quantity" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </FormProvider>
    </div>
  );
};
export default SingleShelterFood;
