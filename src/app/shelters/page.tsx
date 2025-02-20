"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shelter } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { api, TRPCProvider } from "../trpc/client";
import { get } from "http";

const Home = () => {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);

  const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

  const [toSearch, setToSearch] = useState<string>("");

  const formVal = useRef<HTMLInputElement>(null);

  const { data: shelt } = api.getShelters.useQuery();

  const singleShelter = api.getShelterByName.useQuery(toSearch);

  const utils = api.useUtils();

  // useEffect(() => {
  //   if (shelt?.length) {
  //     setShelters(shelt as Shelter[]);
  //   }
  // }, [shelt]);

  if (!shelters) {
    return <h1>Loading Shelters...</h1>;
  }

  return (
    <TRPCProvider>
      <main className="flex flex-col items-center align-middle ">
        <h1>Welcome to the Shelters page</h1>
      </main>
    </TRPCProvider>
  );
};

export default Home;
