import { trpc } from "@/server/trpc/server";
import ShelterProfile from "../components/ShelterProfile";
// import { api } from "@/trpc/server";

export default async function ShelterPage({
  params,
}: {
  params: { shelter: string };
}) {
  const shelterId = parseInt(params.shelter);
  const shelter = await trpc.getShelterById(shelterId);

  // const shelter = await trpc.getShelterByName(params.shelter);
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
  const shelters = await trpc.getShelters();

  return shelters.map((shelter) => ({
    shelter: shelter.id.toString(),
  }));

  // return shelters.map((shelter) => ({
  //   params: {
  //     shelter: shelter.id,
  //   },
  // }));
}
