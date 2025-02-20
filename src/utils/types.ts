import z from "zod";

const item = z.object({
  id: z.number(),
  itemName: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const animal = z.object({
  id: z.number(),
  name: z.string(),
  species: z.string(),
  age: z.number(),
  chipNumber: z.string(),
  shelterId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  breed: z.string(),
});

export const food = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  shelterId: z.number(),
});

export const shelter = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  capacity: z.number(),
  phone: z.string(),
  email: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  animals: z.array(animal),
  foods: z.array(food),
});

const Condition = z.enum(["HEALTHY", "SICK", "INJURED", "DISABLED"]);

const Role = z.enum(["USER", "ADMIN"]);

export type Item = z.infer<typeof item>;

export type Animal = z.infer<typeof animal>;
export type Shelter = z.infer<typeof shelter>;
export type Food = z.infer<typeof food>;
export type Condition = z.infer<typeof Condition>;
export type Role = z.infer<typeof Role>;

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
