import { Animal, Food, Shelter } from "@prisma/client";

export const foodPayload = (food: Food) => {
  return {
    id: food.id,
    name: food.name,
    type: food.type,
    brand: food.brand,
    quantity: food.quantity,
    shelterId: food.shelter_id,
    createdAt: food.created_at,
    updatedAt: food.updated_at,
  };
};

export const animalPayload = (animal: Animal) => {
  return {
    id: animal.id,
    name: animal.name,
    species: animal.species,
    breed: animal.breed,
    age: animal.age,
    chipNumber: animal.chip_number,
    shelterId: animal.shelter_id,
    createdAt: animal.created_at,
    updatedAt: animal.updated_at,
  };
};

export const shelterPayload = (shelter: Shelter) => {
  return {
    id: shelter.id,
    name: shelter.name,
    location: shelter.location,
    phone: shelter.phone,
    email: shelter.email,
    capacity: shelter.capacity,
    longitude: shelter.longitude,
    latitude: shelter.latitude,
    createdAt: shelter.created_at,
    updatedAt: shelter.updated_at,
  };
};

export const shelterWithAnimalsAndFood = (
  shelters: Shelter[],
  animals: Animal[],
  food: Food[]
) => {
  return {
    shelters: shelters.map(shelterPayload),
    animals: animals.map(animalPayload),
    food: food.map(foodPayload),
  };
};
