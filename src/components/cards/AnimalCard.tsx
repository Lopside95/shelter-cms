import React from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";

const AnimalCard = ({ animal }: { animal: AnimalProps }) => {
  const router = useRouter();

  return (
    <Card key={animal.id}>
      <CardContent
        className="cursor-pointer p-4"
        onClick={() => router.push(`/animals/${animal.id}`)}
      >
        <div className="flex items-center space-x-4">
          <Image
            src={"/placeholder.svg"}
            alt={animal.name}
            width={100}
            height={100}
            className="rounded-sm"
          />
          <div>
            <h3 className="font-semibold">{animal.name}</h3>
            <p className="text-sm text-gray-500">{animal.age}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
