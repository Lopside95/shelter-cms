import { trpc } from "@/server/trpc/server";
import { AnimalProps } from "@/utils/types";
import Link from "next/link";

const AnimalsHome = async ({ animals }: { animals: AnimalProps[] }) => {
  // const res = await trpc.animals.getAnimalById(1);
  const res = await trpc.animals.getAnimals();

  // console.log("res", res.data);

  if (!res.data) {
    return <div>No animals found</div>;
  }

  const ani = res.data[0];

  return (
    <div>
      <Link href={`/animals/${ani.id as number}`}>Go</Link>
    </div>
  );
};

export default AnimalsHome;
