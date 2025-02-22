import { trpc } from "@/server/trpc/server";
import ShelterProfile from "../pages/ShelterProfile";
import {
  animal,
  AnimalProps,
  DynamicParams,
  food,
  ShelterProps,
} from "@/utils/types";
import { Animal, Shelter } from "@prisma/client";

export default async function ShelterPage({
  params,
}: {
  params: DynamicParams;
}) {
  // const shelterId = params.shelter;
  const shelterId = (await params).params;

  const shelter = await trpc.shelters.getShelterById(parseInt(shelterId));

  if (!shelter) {
    return (
      <div className="w-full">
        <h1 className="mx-auto mt-20">Not shelters found</h1>
      </div>
    );
  }

  return <ShelterProfile shelter={shelter} />;
}

export async function generateStaticParams() {
  const shelters = await trpc.shelters.getOnlyShelters();

  return shelters.map((shelter) => ({
    shelter: shelter.id.toString(),
  }));
}
