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

  const mutateFood = api.food.createFood.useMutation();
  const mutateAnimal = api.animals.createAnimal.useMutation();
  const makeFood = async () => {
    const res = mutateFood.mutate({
      name: "Chicken Bits",
      type: "Wet",
      brand: "Butternut Box",
      quantity: 10,
      shelterId: 1,
    });

    return res;
  };

  const addAnimal = () => {
    const res = mutateAnimal.mutate({
      name: "Athena",
      species: "DOG",
      age: 7,
      chipNumber: "123456789",
      shelterId: 1,
      breed: "Africanis",
    });
    return res;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <AnimalsTabs animals={animals ? animals : []} />
      <Button onClick={makeFood}>Make Food</Button>
      <Button onClick={addAnimal}>Add animal</Button>
      <FoodCard food={food ? food : []} />
    </div>
  );
};

export default ShelterProfile;
