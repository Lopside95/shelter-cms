import { trpc } from "@/server/trpc/server";
import SheltersHome from "./pages/SheltersHome";
import { shelterPayload, shelterWithAnimalsAndFood } from "@/utils/helpers";

export default async function ShelterPage() {
  const shelters = await trpc.shelters.getShelters();

  const food = shelters.map((shelter) => shelter.foods);

  // const {animals, food} = shelters.map((shelter))

  return <SheltersHome shelters={shelters} />;
}
