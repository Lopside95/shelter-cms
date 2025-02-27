import React from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent } from "../ui/card";

const AnimalCard = ({ animal }: { animal: AnimalProps }) => {
  return (
    <Card key={animal.id}>
      <CardContent className="p-4">
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
