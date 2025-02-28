import { trpc } from "@/server/trpc/server";
import ShelterProfile from "../pages/ShelterProfile";
import { DynamicParams } from "@/utils/types";

export default async function ShelterPage({
  params,
}: {
  params: DynamicParams;
}) {
  const shelterId = (await params).id;

  const shelter = await trpc.shelters.getShelterById(parseInt(shelterId));

  if (!shelter) {
    return (
      <div className="w-full">
        <h1 className="mx-auto mt-20">Not shelters found</h1>
      </div>
    );
  }

  return (
    <ShelterProfile
      shelter={shelter}
      animals={shelter.animals}
      food={shelter.food}
    />
  );
}

export async function generateStaticParams() {
  const shelters = await trpc.shelters.getOnlyShelters();

  return shelters.map((shelter) => ({
    shelter: shelter.id.toString(),
  }));
}
