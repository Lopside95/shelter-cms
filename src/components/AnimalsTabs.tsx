import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimalProps, Species } from "@/utils/types";
import AnimalCard from "./AnimalCard";

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
            <TabsTrigger value="CATS" className="flex items-center gap-2">
              <Cat className="h-4 w-4" /> Cats
            </TabsTrigger>
            <TabsTrigger value="DOGS" className="flex items-center gap-2">
              <Dog className="h-4 w-4" /> Dogs
            </TabsTrigger>
          </TabsList>

          {animals.map((animal) => (
            <TabsContent key={animal.id} value={animal.species}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnimalsTabs;
