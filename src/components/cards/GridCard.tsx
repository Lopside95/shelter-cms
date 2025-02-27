import React, { use } from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Dog, Loader2 } from "lucide-react";
import { AnimalWithShelter } from "@/app/animals/pages/AnimalsHome";
import { api } from "@/app/trpc/client";
import { get } from "http";

interface GridCardProps {
  animal: AnimalProps;
  // animal: AnimalWithShelter;
  onClick: (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
}

const GridCard = ({ animal, onClick }: GridCardProps) => {
  // const shelter = api.shelters.getOnlyShelterById.useQuery(animal.shelterId, {
  //   enabled: true,
  // });

  // const res = animal.shelterId
  //   ? api.shelters.getOnlyShelterById.useQuery(animal.shelterId, {
  //       enabled: true,
  //     })
  //   : null;

  // if (res) {
  //   console.log("gridcard res", res.data);
  // }

  // const getShelterDetails = async (shelterId: number) => {

  //   console.log("res", res);

  //   return res;
  // };

  // if (animal.shelterId) {
  //   getShelterDetails(animal.shelterId);
  // }

  setTimeout(() => {});

  return (
    <Card className="rounded-none flex flex-col justify-between items-center w-80 h-80">
      <CardContent className="  p-4">
        <div>
          <h3 className="font-semibold cursor-pointer" onClick={onClick}>
            {animal.name}
          </h3>
          <p className="text-sm ">{animal.age} Years old</p>
          {/* <p className="text-sm ">{res?.data?.name}</p> */}
        </div>
        <Image
          src={animal.image.length > 0 ? animal.image : "/icons/dog.png"}
          alt={animal.name}
          width={100}
          height={100}
          className="rounded-sm"
        />
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <p className="text-sm text-gray-600">{animal.chipNumber}</p>
        {/* <p>{animal.shelterName}</p> */}
      </CardFooter>
    </Card>
  );
};

export default GridCard;
