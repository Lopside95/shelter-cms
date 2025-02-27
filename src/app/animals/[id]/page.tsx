import { trpc } from "@/server/trpc/server";
import { AnimalProps, DynamicParams } from "@/utils/types";
import AnimalProfile from "../pages/AnimalProfile";

const AnimalProfilePage = async ({ params }: { params: DynamicParams }) => {
  const animalId = (await params).id;

  const res = await trpc.animals.getAnimalById(parseInt(animalId));

  if (!res) {
    return (
      <div className="w-full">
        <h1 className="mx-auto mt-20">Animal not found</h1>
      </div>
    );
  }

  const animal = res?.data;
  // const animal = res?.data.animal as AnimalProps;

  type AnimalType = typeof animal;

  const data = res.data;

  const load = animal as AnimalType;

  console.log("res.data", res.data);

  return <AnimalProfile data={data} />;
};

export default AnimalProfilePage;

export async function generateStaticParams() {
  const res = await trpc.animals.getAnimals();

  const animals = res.data;

  return animals.map((animal) => {
    return {
      animal: animal.id.toString(),
    };
  });
}
