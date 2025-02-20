import { trpc } from "@/server/trpc/server";
import CreateItem from "./components/CreateItem";
// import { api } from "@/trpc/server";

export default async function ItemsPage() {
  // Fetch initial data on the server
  const items = await trpc.items.getItems();

  // const shelters = await api.getAllShelters.query();

  return <CreateItem items={items} />;
}
