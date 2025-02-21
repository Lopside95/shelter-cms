"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import AnimalsTabs from "@/components/AnimalsTabs";
import { ShelterProps } from "@/utils/types";
import FoodCard from "@/components/FoodCard";
import { api } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";

const ShelterProfile = ({ shelter }: { shelter: ShelterProps }) => {
  const { animals, food } = shelter;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <AnimalsTabs animals={animals ? animals : []} />

      <FoodCard food={food ? food : []} />
    </div>
  );
};

export default ShelterProfile;
