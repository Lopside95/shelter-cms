"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import { ShelterProps } from "@/utils/types";
import { api } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";
import AnimalsTabs from "@/components/cards/AnimalsTabs";
import FoodCard from "@/components/cards/FoodCard";
import AddAnimalForm from "../components/AddAnimalForm";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { uploadPhoto } from "@/utils/helpers";

const ShelterProfile = ({ shelter }: { shelter: ShelterProps }) => {
  const { animals, food } = shelter;

  const [photo, setPhoto] = useState<string | null>(null);

  const shelterId = shelter.id;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <AnimalsTabs animals={animals ? animals : []} />
      <Card className="flex flex-col gap-5">
        <AddAnimalForm shelterId={shelter.id} />
      </Card>

      {food.map((item) => (
        <FoodCard key={item.id} food={item} />
      ))}
    </div>
  );
};

export default ShelterProfile;
