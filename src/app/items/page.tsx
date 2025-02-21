import { trpc } from "@/server/trpc/server";
import CreateItem from "./components/CreateItem";

export default async function ItemsPage() {
  const items = await trpc.items.getItems();

  if (!items) {
    return <div>No items found</div>;
  }

  return <CreateItem items={items} />;
}
