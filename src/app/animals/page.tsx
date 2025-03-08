import { trpc } from "@/server/trpc/server";
import { AnimalProps, ShelterProps } from "@/utils/types";
import Link from "next/link";
import AnimalsHome from "./pages/AnimalsHome";

const AnimalsHomePage = async () => {
  const res = await trpc.animals.getAnimals();

  if (!res || !res.data) {
    return <div>No data found</div>;
  }

  return <AnimalsHome animals={res.data} />;
};

export default AnimalsHomePage;
