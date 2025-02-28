"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import { AnimalProps, FoodProps, ShelterProps } from "@/utils/types";
import { api } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";
import AnimalsTabs from "@/components/cards/AnimalsTabs";
import FoodCard from "@/components/cards/FoodCard";
import AddAnimalForm from "../components/AddAnimalForm";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { uploadPhoto } from "@/utils/helpers";

interface ShelterProfileProps {
  shelter: ShelterProps;
  animals: AnimalProps[];
  food: FoodProps[];
}

const ShelterProfile = ({ shelter, animals, food }: ShelterProfileProps) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const shelterId = shelter.id;

  const { id, name } = shelter;

  useEffect(() => {
    console.log("animals Length", animals.length);
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <AnimalsTabs animals={animals ? animals : []} />
      <Card className="flex flex-col gap-5">
        <AddAnimalForm
          shelterId={shelter.id}
          shelterName={shelter.name}
          animalsLength={animals?.length}
        />
      </Card>

      {food.map((item) => (
        <FoodCard key={item.id} food={item} />
      ))}
    </div>
  );
};

export default ShelterProfile;
