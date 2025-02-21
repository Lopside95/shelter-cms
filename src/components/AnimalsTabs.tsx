import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AnimalCard from "./AnimalCard";
import { AnimalProps, Species } from "@/utils/types";

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

          {animals.map((animal) => (
            <TabsContent key={animal.species} value={animal.species}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                  //   <Card key={animal.id}>
                  //     <CardContent className="p-4">
                  //       <div className="flex items-center space-x-4">
                  //         <Image
                  //           src={animal.image || "/placeholder.svg"}
                  //           alt={animal.name}
                  //           width={100}
                  //           height={100}
                  //           className="rounded-full"
                  //         />
                  //         <div>
                  //           <h3 className="font-semibold">{animal.name}</h3>
                  //           <p className="text-sm text-gray-500">{animal.age}</p>
                  //         </div>
                  //       </div>
                  //     </CardContent>
                  //   </Card>
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
