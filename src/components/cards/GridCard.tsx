import React, { use } from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { api } from "@/app/trpc/client";

interface GridCardProps {
  animal: AnimalProps;
  onClick: (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
}

const GridCard = ({ animal, onClick }: GridCardProps) => {
  const shelterData = () => {
    if (animal.shelterId) {
      const shelterData = api.shelters.getShelterById.useQuery(
        animal.shelterId
      );
      return shelterData?.data?.name;
    } else {
      return null;
    }
  };

  return (
    <Card className="rounded-none flex flex-col m-0.5 justify-between items-center w-80 h-80   hover:shadow-lg transition-shadow ">
      <CardContent onClick={onClick} className="cursor-pointer p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold cursor-pointer">{animal.name}</h3>
          <p className="text-sm ">{animal.age} years old</p>
        </div>
        <Image
          src={animal.image.length > 0 ? animal.image : "/icons/dog.png"}
          alt={animal.name + " Image"}
          width={200}
          height={200}
          className="rounded-sm w-40"
        />
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <p className="text-sm text-gray-600">{animal.id}</p>
        <p>{shelterData()}</p>
      </CardFooter>
    </Card>
  );
};

export default GridCard;
