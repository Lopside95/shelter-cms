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

// Types
interface FoodItem {
  id: string | number;
  name: string;
  brand: string;
  quantity: number;
  shelterId: number;
  shelterName: string;
  updatedAt: Date;
}

interface FoodInventoryTableProps {
  foodItems: FoodItem[];
  onUpdateFood: (id: string | number, updatedData: Partial<FoodItem>) => void;
}

export function FoodInventoryTable({
  foodItems,
  onUpdateFood,
}: FoodInventoryTableProps) {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShelter, setSelectedShelter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof FoodItem>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FoodItem>>({});

  // Get unique shelters for filter
  const shelters = Array.from(
    new Set(foodItems.map((item) => item.shelterName))
  );

  // Filter and sort food items
  const filteredAndSortedItems = foodItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesShelter =
        selectedShelter === "all" || item.shelterName === selectedShelter;

      return matchesSearch && matchesShelter;
    })
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Handle row click
  const handleRowClick = (food: FoodItem) => {
    setSelectedFood(food);
    setFormData({
      name: food.name,
      brand: food.brand,
      quantity: food.quantity,
      shelterId: food.shelterId,
    });
    setIsDialogOpen(true);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number.parseInt(value, 10) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFood && formData) {
      onUpdateFood(selectedFood.id, formData);
      setIsDialogOpen(false);
    }
  };

  // Handle sort
  const handleSort = (field: keyof FoodItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get quantity status
  const getQuantityStatus = (quantity: number) => {
    if (quantity <= 5) return { label: "Low", variant: "destructive" as const };
    if (quantity <= 20) return { label: "Medium", variant: "warning" as const };
    return { label: "Good", variant: "success" as const };
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
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
        <DropdownMenu>
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
        </DropdownMenu>
      </div>

      {/* Table */}
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
                  onClick={() => handleSort("shelterName")}
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
                        <Badge variant={status.variant} className="mr-2">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
            <DialogDescription>
              Update the details for this food item. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity || 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
