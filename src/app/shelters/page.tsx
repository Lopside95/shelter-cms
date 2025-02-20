"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shelter } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { api, TRPCProvider } from "../trpc/client";
import { get } from "http";
import { Form } from "react-hook-form";

const Home = () => {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);

  const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

  const [toSearch, setToSearch] = useState<string>("");

  const formVal = useRef<HTMLInputElement>(null);

  const { data: shelt } = api.getShelters.useQuery();

  const singleShelter = api.getShelterByName.useQuery(toSearch);

  const utils = api.useUtils();

  return (
    <main className="flex flex-col items-center align-middle ">
      <h1>Welcome to the Shelters page</h1>
      <Input className="w-80" onChange={(e) => setToSearch(e.target.value)} />
      <Button
        onClick={() => {
          singleShelter.refetch();
          console.log(singleShelter);
        }}
      >
        Get shelter by name
      </Button>
    </main>
  );
};

export default Home;
