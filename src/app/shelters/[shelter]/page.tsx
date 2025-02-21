import { trpc } from "@/server/trpc/server";
import ShelterProfile from "../pages/ShelterProfile";
import { animal, AnimalProps, food, ShelterProps } from "@/utils/types";
import { Animal, Shelter } from "@prisma/client";

export default async function ShelterPage({
  params,
}: {
  params: { shelter: string };
}) {
  const shelterId = (await params).shelter;
  const animals = await trpc.animals.getAnimalsByShelterId(parseInt(shelterId));
  const food = await trpc.food.getFoodsByShelterId(parseInt(shelterId));
  const shelter = await trpc.shelters.getShelterById(parseInt(shelterId));

  if (!shelter) {
    return (
      <div className="w-full">
        <h1 className="mx-auto mt-20">Not shelters found</h1>
      </div>
    );
  }

  const shelterData = {
    ...shelter,
    animals: animals || [],
    food: food || [],
  };

  return (
    <ShelterProfile shelter={shelterData} />
    // <ShelterProfile shelter={shelterPayload} animals={animalsPayload.animals} />
  );
}

export async function generateStaticParams() {
  const shelters = await trpc.shelters.getOnlyShelters();

  return shelters.map((shelter) => ({
    shelter: shelter.id.toString(),
  }));
}
