"use client";

import GridCard from "@/components/cards/GridCard";
import { AnimalProps } from "@/utils/types";
import { useRouter } from "next/navigation";

export type AnimalWithShelter = AnimalProps & { shelterName: string };

const AnimalsHome = ({ animals }: { animals: AnimalProps[] }) => {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/animals/${id}`);
  };

  return (
    <div className="flex flex-wrap p-3">
      {animals.map((animal) => {
        return (
          <GridCard
            onClick={() => handleClick(animal.id)}
            key={animal.id}
            animal={animal}
          />
        );
      })}
    </div>
  );
};

export default AnimalsHome;
