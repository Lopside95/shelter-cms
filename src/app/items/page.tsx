import { trpc } from "@/server/trpc/server";
import CreateItem from "./components/CreateItem";
// import { api } from "@/trpc/server";

export default async function ItemsPage() {
  // Fetch initial data on the server
  const itemsData = await trpc.items.getItems();
  const items =
    itemsData?.map((item) => ({
      id: item.id,
      itemName: item.item_name,
      quantity: item.quantity,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    })) || [];

  // const shelters = await api.getAllShelters.query();

  return <CreateItem items={items} />;
}
