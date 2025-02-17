"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shelter } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);

  const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

  const [toSearch, setToSearch] = useState<string>("");

  const formVal = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  if (!shelters) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex flex-col items-center align-middle ">
      <h1>Welcome to the CMS</h1>
    </main>
  );
};

export default Home;
