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
import MyPieChart from "../PieChart";

const ShelterCard = ({ shelter }: { shelter: ShelterWhole }) => {
  const router = useRouter();

  const { animals, food } = shelter;

  const dogs = animals.filter((animal) => animal.species === Species.DOG);
  const cats = animals.filter((animal) => animal.species === Species.CAT);
  const rabbits = animals.filter((animal) => animal.species === Species.RABBIT);
  const birds = animals.filter((animal) => animal.species === Species.BIRD);
  const others = animals.filter((animal) => animal.species === Species.OTHER);

  const chartData = [
    { name: "Dogs", value: dogs.length, color: "#ff0000" },
    { name: "Cats", value: cats.length, color: "#00ff00" },
    { name: "Rabbits", value: rabbits.length, color: "#0000ff" },
    { name: "Birds", value: birds.length, color: "#ffff00" },
    { name: "Others", value: others.length, color: "#ff00ff" },
  ];

  const animalSpecies = [
    { name: "Dogs", data: dogs },
    { name: "Cats", data: cats },
    { name: "Rabbits", data: rabbits },
    { name: "Birds", data: birds },
    { name: "Others", data: others },
  ];

  // interface DataItem {
  //   name: string;
  //   value: number;
  //   color: string;
  // }
  // interface AnimatedPieChartProps {
  //   data: DataItem[];
  //   title?: string;
  //   animationDuration?: number;
  // }

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
        {/* <MyPieChart data={chartData} /> */}

        <h1>{`${animals.length} Animals`}</h1>
        {animalSpecies.map((group) => (
          <div className="flex" key={group.name}>
            {group.data.length > 0 && (
              <h1>{`${group.name}: ${group.data.length}`}</h1>
            )}
          </div>
        ))}
        {food.length > 0 && <h1>{`Food: ${food.length}`}</h1>}

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
