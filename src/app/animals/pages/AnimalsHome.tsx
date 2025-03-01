"use client";

import AddAnimalForm from "@/app/shelters/components/AddAnimalForm";
import { api } from "@/app/trpc/client";
import GenericGridProps from "@/components/cards/GenericGridCard";
import GridCard from "@/components/cards/GridCard";
import { AnimalProps, ShelterProps } from "@/utils/types";
import { Link } from "lucide-react";
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
      <h1>Animals</h1>
    </div>
  );
};

export default AnimalsHome;
