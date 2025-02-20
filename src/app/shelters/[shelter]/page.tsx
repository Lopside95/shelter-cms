"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Cat,
  Dog,
  Rabbit,
  Bird,
} from "lucide-react";
import Image from "next/image";
import { getUrl } from "@/app/trpc/client";
import { Shelter } from "@prisma/client";

// Mock data - replace with actual data fetching
const SHELTER_DATA = {
  name: "Happy Paws Shelter",
  address: "123 Care Lane, Animal City, AC 12345",
  phone: "+1 (555) 123-4567",
  email: "contact@happypaws.example",
  animals: {
    cats: [
      {
        id: 1,
        name: "Whiskers",
        age: "2 years",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Mittens",
        age: "1 year",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    dogs: [
      {
        id: 3,
        name: "Buddy",
        age: "3 years",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 4,
        name: "Max",
        age: "4 years",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  foodInventory: [
    { id: 1, type: "Dry Cat Food", brand: "Premium Nutrition", quantity: 50 },
    { id: 2, type: "Wet Dog Food", brand: "Healthy Paws", quantity: 30 },
    { id: 3, type: "Rabbit Pellets", brand: "Natural Choice", quantity: 20 },
  ],
};

const COUNTRY_CODES = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+61", country: "Australia" },
  // Add more country codes as needed
];

export default function ShelterProfile() {
  const [selectedAnimalType, setSelectedAnimalType] = useState("cats");
  const [foodSearch, setFoodSearch] = useState("");
  const [foodType, setFoodType] = useState("all");

  const filteredFood = SHELTER_DATA.foodInventory.filter(
    (food) =>
      food.type.toLowerCase().includes(foodSearch.toLowerCase()) &&
      (foodType === "all" || food.type.toLowerCase().includes(foodType))
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Shelter Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">
                {SHELTER_DATA.name}
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                {SHELTER_DATA.address}
              </CardDescription>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{SHELTER_DATA.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{SHELTER_DATA.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Update Section */}
      <Card>
        <CardHeader>
          <CardTitle>Update Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="flex gap-2">
                <Select defaultValue="+1">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="contact@shelter.example" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animals Section */}
      <Card>
        <CardHeader>
          <CardTitle>Our Animals</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedAnimalType}
            onValueChange={setSelectedAnimalType}
          >
            <TabsList className="grid grid-cols-4 w-full max-w-[400px]">
              <TabsTrigger value="cats" className="flex items-center gap-2">
                <Cat className="h-4 w-4" /> Cats
              </TabsTrigger>
              <TabsTrigger value="dogs" className="flex items-center gap-2">
                <Dog className="h-4 w-4" /> Dogs
              </TabsTrigger>
              <TabsTrigger value="rabbits" className="flex items-center gap-2">
                <Rabbit className="h-4 w-4" /> Rabbits
              </TabsTrigger>
              <TabsTrigger value="birds" className="flex items-center gap-2">
                <Bird className="h-4 w-4" /> Birds
              </TabsTrigger>
            </TabsList>

            {Object.entries(SHELTER_DATA.animals).map(([type, animals]) => (
              <TabsContent key={type} value={type}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {animals.map((animal) => (
                    <Card key={animal.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={animal.image || "/placeholder.svg"}
                            alt={animal.name}
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{animal.name}</h3>
                            <p className="text-sm text-gray-500">
                              {animal.age}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Food Inventory Section */}
      <Card>
        <CardHeader>
          <CardTitle>Food Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search food inventory..."
                    value={foodSearch}
                    onChange={(e) => setFoodSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cat">Cat Food</SelectItem>
                  <SelectItem value="dog">Dog Food</SelectItem>
                  <SelectItem value="rabbit">Rabbit Food</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFood.map((food) => (
                <Card key={food.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{food.type}</h3>
                        <p className="text-sm text-gray-500">{food.brand}</p>
                      </div>
                      <Badge variant="secondary">Qty: {food.quantity}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// export async function generateStaticParams() {
//   const shelters: Shelter[] = await fetch(`${getUrl}/shelters`).then((res) =>
//     res.json()
//   );

//   return shelters.map((shelter) => ({
//     slug: shelter.id,
//   }));
// }
