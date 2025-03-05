"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FoodInventoryTable } from "@/components/FoodInvTable";

// Mock data - replace with actual data fetching
const mockFoodItems = [
  {
    id: 1,
    name: "Dry Cat Food",
    brand: "Premium Nutrition",
    quantity: 50,
    shelterId: 1,
    shelterName: "Happy Paws Shelter",
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: 2,
    name: "Wet Dog Food",
    brand: "Healthy Paws",
    quantity: 30,
    shelterId: 1,
    shelterName: "Happy Paws Shelter",
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: 3,
    name: "Rabbit Pellets",
    brand: "Natural Choice",
    quantity: 5,
    shelterId: 2,
    shelterName: "Furry Friends Rescue",
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: 4,
    name: "Bird Seed Mix",
    brand: "Feathered Friends",
    quantity: 15,
    shelterId: 2,
    shelterName: "Furry Friends Rescue",
    updatedAt: new Date("2024-02-18"),
  },
  {
    id: 5,
    name: "Senior Dog Food",
    brand: "Golden Years",
    quantity: 25,
    shelterId: 3,
    shelterName: "Second Chance Shelter",
    updatedAt: new Date("2024-02-22"),
  },
  {
    id: 6,
    name: "Kitten Formula",
    brand: "Little Whiskers",
    quantity: 10,
    shelterId: 3,
    shelterName: "Second Chance Shelter",
    updatedAt: new Date("2024-02-19"),
  },
  {
    id: 7,
    name: "Puppy Chow",
    brand: "Growing Pups",
    quantity: 3,
    shelterId: 1,
    shelterName: "Happy Paws Shelter",
    updatedAt: new Date("2024-02-21"),
  },
];

export default function FoodInventoryPage() {
  const [foodItems, setFoodItems] = useState(mockFoodItems);

  const handleUpdateFood = (
    id: string | number,
    updatedData: Partial<(typeof mockFoodItems)[0]>
  ) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedData, updatedAt: new Date() }
          : item
      )
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Food Inventory</h1>
          <p className="text-muted-foreground">
            Manage and track food supplies across all shelters.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Food Item
        </Button>
      </div>

      <FoodInventoryTable
        foodItems={foodItems}
        onUpdateFood={handleUpdateFood}
      />
    </div>
  );
}

// "use client";

// import { api } from "@/app/trpc/client";
// import { useQuery } from "@tanstack/react-query";

// const FoodHome = () => {
//   // const foodQuery = useQuery(api.food.getFood({id: 1}));

//   const { data, isLoading } = api.food.getFood.useQuery();

//   if (isLoading) console.log("isLoading", isLoading);

//   // if (isLoading) return <div>Loading...</div>;

//   return <div>FoodHome</div>;
// };

// export default FoodHome;
