import { Condition, Species } from "@prisma/client";
import z from "zod";

export const itemSchema = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  quantity: z.number(),
});

export const animalSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  species: z.enum([Species.DOG, Species.CAT, Species.RABBIT, Species.BIRD]),
  // species: z.string().min(1, { message: "Species is required" }),
  age: z.number().min(1, { message: "Age is required" }),
  chipNumber: z.string().min(1, { message: "Chip number is required" }),
  shelterId: z.number().optional(),
  breed: z.string().min(1, { message: "Breed is required" }),
  image: z.string().optional(),
  condition: z.enum([
    Condition.HEALTHY,
    Condition.SICK,
    Condition.INJURED,
    Condition.DISABLED,
  ]),
});

export const foodSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  type: z.string().optional(),
  brand: z.string(),
  quantity: z.number(),
  shelterId: z.number(),
});

export const shelterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  // longitude: z.number().min(-180).max(180),
  // latitude: z.number().min(-90).max(90),
  capacity: z.number().min(0, "Capacity must be a positive number"),
  animals: z.array(animalSchema).optional(),
  food: z.array(foodSchema).optional(),
});

export type AnimalSchema = z.infer<typeof animalSchema>;
export type ShelterSchema = z.infer<typeof shelterSchema>;
export type FoodSchema = z.infer<typeof foodSchema>;
export type ItemSchema = z.infer<typeof itemSchema>;
