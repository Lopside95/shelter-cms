"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import { AnimalProps, FoodProps, ShelterProps } from "@/utils/types";
import AnimalsTabs from "@/components/cards/AnimalsTabs";
import AddAnimalForm from "../components/AddAnimalForm";
import { Card } from "@/components/ui/card";
import SingleShelterFood from "../components/SingleShelterFood";

interface ShelterProfileProps {
  shelter: ShelterProps;
  animals: AnimalProps[];
  food: FoodProps[];
}

const ShelterProfile = ({ shelter, animals, food }: ShelterProfileProps) => {
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

      <SingleShelterFood food={food} />
    </div>
  );
};

export default ShelterProfile;
