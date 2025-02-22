import { trpc } from "@/server/trpc/server";
import { animal, AnimalProps, DynamicParams } from "@/utils/types";
import AnimalProfile from "../components/AnimalProfile";

// type AnimalParams = Promise<{ id: string }>;

const AnimalProfilePage = async ({ params }: { params: DynamicParams }) => {
  // const animalId = params.animal
  const animalId = (await params).id;

  console.log("animalId", animalId);

  const res = await trpc.animals.getAnimalById(parseInt(animalId));

  // if (!res) {
  //   return (
  //     <div className="w-full">
  //       <h1 className="mx-auto mt-20">Animal not found</h1>
  //     </div>
  //   );
  // }
  const animal = res?.data;

  return <AnimalProfile animal={animal} />;
};

export default AnimalProfilePage;

export async function generateStaticParams() {
  const res = await trpc.animals.getAnimals();

  const animals = res.data;

  console.log("animals in static params", animals);

  return animals.map((animal) => {
    // console.log("animal", animal);
    return {
      animal: animal.id.toString(),
    };
  });
}
