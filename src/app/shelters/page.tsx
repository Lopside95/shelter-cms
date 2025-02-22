import { trpc } from "@/server/trpc/server";
import SheltersHome from "./pages/SheltersHome";

export default async function ShelterPage() {
  const shelters = await trpc.shelters.getShelters();

  return <SheltersHome shelters={shelters} />;
}
