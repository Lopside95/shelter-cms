import {
  AnimalProps,
  FoodProps,
  ShelterProps,
  ShelterWhole,
} from "@/utils/types";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
import { Species } from "@prisma/client";
import { MapPin } from "lucide-react";

const ShelterCard = ({ shelter }: { shelter: ShelterWhole }) => {
  const router = useRouter();

  const { animals, food } = shelter;

  const dogs = animals.filter((animal) => animal.species === Species.DOG);
  const cats = animals.filter((animal) => animal.species === Species.CAT);
  const rabbits = animals.filter((animal) => animal.species === Species.RABBIT);
  const birds = animals.filter((animal) => animal.species === Species.BIRD);
  const others = animals.filter((animal) => animal.species === Species.OTHER);

  const animalSpecies = [
    { name: "Dogs", data: dogs },
    { name: "Cats", data: cats },
    { name: "Rabbits", data: rabbits },
    { name: "Birds", data: birds },
    { name: "Others", data: others },
  ];

  return (
    <Card className=" items-center w-3/4 flex px-5">
      <CardHeader>
        <CardTitle className="flex gap-5 flex-col w-32">
          <p>{shelter.name}</p>
          <p className="flex gap-2 items-center">
            {shelter.location} <MapPin className="w-3 text-red-400" />
          </p>
        </CardTitle>
        <CardDescription>{/* {desc || "Find Shelter"}  */}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full p-0  justify-between">
        <h1>{`${animals.length} Animals`}</h1>
        {animalSpecies.map((group) => (
          <div className="flex" key={group.name}>
            {group.data.length > 0 && (
              <h1>{`${group.name}: ${group.data.length}`}</h1>
            )}
          </div>
        ))}
        {food.length > 0 && <h1>{`Food: ${food.length}`}</h1>}
        {/* <h1>{`Dogs: ${animals.length}`}</h1>
        <h1>{`Cats: ${animals.length}`}</h1>
        <h1>{`Animals: ${animals.length}`}</h1> */}

        {/* {animals.length && animals[0].name} */}
        <div>
          <Button onClick={() => router.push(`shelters/${shelter.id}`)}>
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;
