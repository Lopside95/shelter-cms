import { trpc } from "@/server/trpc/server";
import CreateShelter from "./components/CreateShelter";
// import { api } from "@/trpc/server";

export default async function ShelterPage() {
  // Fetch initial data on the server
  const shelters = await trpc.shelters.getShelters();

  // const shelters = await api.getAllShelters.query();

  return <CreateShelter initialShelters={shelters} />;
}
