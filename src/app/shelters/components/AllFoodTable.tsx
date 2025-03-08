"use client";

import type React from "react";
import { use, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";
import { api } from "@/app/trpc/client";
import { foodPayload, FoodProps } from "@/utils/types";
import { foodStatus } from "@/utils/helpers";
import FoodUpdateForm from "@/components/inputs/FoodUpdateForm";
import { ref } from "firebase/storage";

type BadgeVariant = "destructive" | "default" | "outline" | "secondary";

type AllFoodProps = {
  food: FoodProps[];
  shelterName: string;
};

type FoodTableProps = FoodProps & {
  shelterName?: string;
};

const AllFoodTable = ({ food }: { food: FoodTableProps[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof FoodProps>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(1);

  const { data, isLoading, refetch } = api.food.getFoodById.useQuery(
    selectedId,
    {
      enabled: true,
      refetchOnMount: true,
    }
  );

  const selectedFood = data?.data;

  // const selectedFood = data?.data ? foodPayload(data.data) : null;
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

  const handleSelectFood = async (foodId: number) => {
    setSelectedId(foodId);
    await refetch();
    if (isLoading) return <div>Loading food...</div>;
    setIsDialogOpen(true);
  };

  const handleSort = (field: keyof FoodProps) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4 w-3/4">
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
                const status = foodStatus(food.quantity);
                return (
                  <TableRow
                    key={food.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSelectFood(food.id)}
                  >
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell>{food.brand}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <Badge
                          variant={status.variant as BadgeVariant}
                          className="mr-2"
                        >
                          {status.label}
                        </Badge>
                        {food.quantity}
                      </div>
                    </TableCell>
                    <TableCell>{food.shelterName}</TableCell>
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

      <FoodUpdateForm
        selectedFood={!isLoading && selectedFood ? selectedFood : null}
        foodId={selectedId!}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        refetch={refetch}
      />
    </div>
  );
};
export default AllFoodTable;
