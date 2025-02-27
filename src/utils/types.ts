import { Animal, Food, Shelter } from "@prisma/client";
import z from "zod";
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
    image: animal.image,
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

export type FoodProps = ReturnType<typeof foodPayload>;
export type AnimalProps = ReturnType<typeof animalPayload>;
export type ShelterProps = ReturnType<typeof shelterPayload>;

export type FormInput = {
  name: string;
  label: string;
  desc?: string;
  placeholder?: string;
  type?: string;
  cn?: string;
};

export type TextInputType = {
  name: string;
  label?: string;
  desc?: string;
  placeholder?: string;
  type?: string;
  txtCn?: string;
  labelCn?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cn?: string;
};

export type DynamicParams = Promise<{ id: string }>;

export type Route = "items" | "animals" | "foods" | "shelters";

export interface Add<T> {
  route: Route;
  data: T;
}
export interface Update<T> {
  route: Route;
  data: T;
  id: number | undefined;
}

// const item = z.object({
//   id: z.number(),
//   itemName: z.string(),
//   quantity: z.number(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const animal = z.object({
//   id: z.number(),
//   name: z.string(),
//   species: z.string(),
//   age: z.number(),
//   chipNumber: z.string(),
//   shelterId: z.number(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   breed: z.string(),
//   image: z.string(),
// });

// export const food = z.object({
//   id: z.number(),
//   name: z.string(),
//   brand: z.string(),
//   type: z.string(),
//   quantity: z.number(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   shelterId: z.number(),
// });

// export const shelter = z.object({
//   id: z.number(),
//   name: z.string(),
//   location: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   capacity: z.number(),
//   phone: z.string(),
//   email: z.string(),
//   longitude: z.number(),
//   latitude: z.number(),
//   animals: z.array(animal),
//   food: z.array(food),
// });

// export const species = z.enum(["DOG", "CAT", "RABBIT", "BIRD"]);
// export const condition = z.enum(["HEALTHY", "SICK", "INJURED", "DISABLED"]);

// export const role = z.enum(["USER", "ADMIN"]);

// export type ItemProps = z.infer<typeof item>;
// export type AnimalProps = z.infer<typeof animal>;
// export type ShelterProps = z.infer<typeof shelter>;
// export type FoodProps = z.infer<typeof food>;
// export type Species = z.infer<typeof species>;
// export type Condition = z.infer<typeof condition>;
// export type Role = z.infer<typeof role>;
