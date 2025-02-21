import { AnimalProps, FoodProps, ShelterProps } from "@/utils/types";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";

interface ShelterCardProps {
  shelter: ShelterProps;
  // animals: AnimalProps[];
  // food: FoodProps[];
}

const ShelterCard = ({ shelter }: { shelter: ShelterProps }) => {
  const router = useRouter();

  const { animals, food } = shelter;

  return (
    <Card className=" w-3/4 px-20 mx-auto">
      <CardHeader>
        <CardTitle>{shelter.name}</CardTitle>
        <CardDescription>{/* {desc || "Find Shelter"}  */}</CardDescription>
      </CardHeader>
      <CardContent>{`Animals: ${animals.length}`}</CardContent>

      <Button onClick={() => router.push(`shelters/${shelter.id}`)}>
        Go to shelter
      </Button>
    </Card>
  );
};

export default ShelterCard;
