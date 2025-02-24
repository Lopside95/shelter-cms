import { trpc } from "@/server/trpc/server";
import { AnimalProps, shelter } from "@/utils/types";
import Link from "next/link";
import AnimalsHome from "./pages/AnimalsHome";

const AnimalsHomePage = async () => {
  // const res = await trpc.animals.getAnimals();

  // fetch  all of the animals from all of the shelters ?
  const shelters = await trpc.shelters.getShelters();

  const allAnimals = shelters.map((shelter) => {
    return shelter.animals;
  });

  const animals = allAnimals.flat();

  if (!shelters) {
    return <div>No shelters found</div>;
  }

  return <AnimalsHome animals={animals} />;
};

export default AnimalsHomePage;
