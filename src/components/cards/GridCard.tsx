import React from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent } from "../ui/card";
import { Dog, Loader2 } from "lucide-react";

interface GridCardProps {
  animal: AnimalProps;
  onClick: (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
}

const GridCard = ({ animal, onClick }: GridCardProps) => {
  return (
    <Card className="rounded-none w-80 h-80">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={animal.image}
            alt={animal.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold cursor-pointer" onClick={onClick}>
              {animal.name}
            </h3>
            <p className="text-sm text-gray-500">{animal.age}</p>
          </div>
        </div>
      </CardContent>
      <q>1q </q>
    </Card>
  );
};

export default GridCard;
