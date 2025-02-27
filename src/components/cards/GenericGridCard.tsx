import React from "react";
import Image from "next/image";
import { AnimalProps } from "@/utils/types";
import { Card, CardContent } from "../ui/card";
import { Dog, Loader2 } from "lucide-react";

type GenericProps<T> = {
  content: T;
  onClick: (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
};

type FieldProps<T> = {
  [K in keyof T]: boolean;
};

type GridCardProps = FieldProps<AnimalProps>;

const GenericGridProps = ({ content, onClick }: GenericProps<AnimalProps>) => {
  return (
    <Card className="rounded-none w-80 h-80">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={content.image.length > 0 ? content.image : "/icons/dog.png"}
            alt={content.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold cursor-pointer" onClick={onClick}>
              {content.name}
            </h3>
            <p className="text-sm text-gray-500">{content.age}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericGridProps;
