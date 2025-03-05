import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimalProps } from "@/utils/types";
import AnimalCard from "./AnimalCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Species } from "@prisma/client";

const AnimalsTabs = ({ animals }: { animals: AnimalProps[] }) => {
  const [selectedAnimalType, setSelectedAnimalType] = useState<Species>("DOG");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Animals</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedAnimalType}
          onValueChange={() => setSelectedAnimalType}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-[400px]">
            <TabsTrigger value="DOGS" className="flex items-center gap-2">
              <Dog className="h-4 w-4" /> Dogs
            </TabsTrigger>
            <TabsTrigger value="CATS" className="flex items-center gap-2">
              <Cat className="h-4 w-4" /> Cats
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={selectedAnimalType}
            className="flex gap-5  flex-wrap"
          >
            {animals.map((animal) => {
              return <AnimalCard key={animal.id} animal={animal} />;
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnimalsTabs;
