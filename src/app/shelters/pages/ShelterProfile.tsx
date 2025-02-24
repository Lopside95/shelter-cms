"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import { ShelterProps } from "@/utils/types";
import { api } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";
import AnimalsTabs from "@/components/cards/AnimalsTabs";
import FoodCard from "@/components/cards/FoodCard";

const ShelterProfile = ({ shelter }: { shelter: ShelterProps }) => {
  const { animals, food } = shelter;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <AnimalsTabs animals={animals ? animals : []} />

      {food.map((item) => (
        <FoodCard key={item.id} food={item} />
      ))}
    </div>
  );
};

export default ShelterProfile;
