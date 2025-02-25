"use client";

import GridCard from "@/components/cards/GridCard";
import { AnimalProps } from "@/utils/types";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

const AnimalsHome = ({ animals }: { animals: AnimalProps[] }) => {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/animals/${id}`);

    // console.log("clicked");
  };

  return (
    <div className="flex flex-wrap p-3">
      <div>Hello</div>
      {animals.map((animal) => {
        return (
          <GridCard
            onClick={() => handleClick(animal.id)}
            key={animal.id}
            animal={animal}
          />
        );
      })}
      {/* <GridCard animals={animals} /> */}
      <h1>Animals</h1>
    </div>
  );
};

export default AnimalsHome;
