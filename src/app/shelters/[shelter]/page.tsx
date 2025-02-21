import { trpc } from "@/server/trpc/server";
import ShelterProfile from "../components/ShelterProfile";
import { AnimalProps, food, ShelterProps } from "@/utils/types";
import { Animal, Shelter } from "@prisma/client";

export default async function ShelterPage({
  params,
}: {
  params: { shelter: string };
}) {
  const shelterId = (await params).shelter;
  const animals = await trpc.animals.getAnimalsByShelterId(parseInt(shelterId));
  const food = await trpc.food.getFoodsByShelterId(parseInt(shelterId));
  const shelter: Shelter = await trpc.shelters.getShelterById(
    parseInt(shelterId)
  );

  const animalsPayload = {
    animals: animals?.map((animal) => ({
      id: animal.id,
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      chipNumber: animal.chip_number,
      shelterId: animal.shelter_id,
      createdAt: animal.created_at,
      updatedAt: animal.updated_at,
    })),
  };

  const foodPayload = {
    food: food?.map((food) => ({
      id: food.id,
      name: food.name,
      type: food.type,
      brand: food.brand,
      quantity: food.quantity,
      shelterId: food.shelter_id,
      createdAt: food.created_at,
      updatedAt: food.updated_at,
    })),
  };

  if (!shelter) {
    return (
      <div className="w-full">
        <h1 className="mx-auto mt-20">Not shelters found</h1>
      </div>
    );
  }

  const shelterPayload: ShelterProps = {
    id: shelter.id,
    name: shelter.name,
    location: shelter.location,
    phone: shelter.phone,
    email: shelter.email,
    capacity: shelter.capacity,
    food: foodPayload.food || [],
    longitude: shelter.longitude,
    latitude: shelter.latitude,
    createdAt: shelter.created_at,
    updatedAt: shelter.updated_at,
    animals: animalsPayload.animals || [],
  };

  return (
    <ShelterProfile shelter={shelterPayload} />
    // <ShelterProfile shelter={shelterPayload} animals={animalsPayload.animals} />
  );
}

export async function generateStaticParams() {
  const shelters = await trpc.shelters.getShelters();

  return shelters.map((shelter) => ({
    shelter: shelter.id.toString(),
  }));
}
