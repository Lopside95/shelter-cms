"use client";

import { api } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";

const FoodHome = () => {
  // const foodQuery = useQuery(api.food.getFood({id: 1}));

  const { data, isLoading } = api.food.getFood.useQuery();

  if (isLoading) console.log("isLoading", isLoading);

  // if (isLoading) return <div>Loading...</div>;

  return <div>FoodHome</div>;
};

export default FoodHome;
