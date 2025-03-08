import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  ChevronLeft,
  Pencil,
  PawPrintIcon as Paw,
  Calendar,
  Building2,
  QrCode,
  Clock,
  CheckCircle2,
  ClipboardPlus,
  Fingerprint,
} from "lucide-react";
import { formatDate } from "@/utils/helpers";
import { AnimalProps } from "@/utils/types";
import ColumnOfInfo from "../ColumnOfInfo";

const SystemInfoCard = ({ animal }: { animal: AnimalProps }) => {
  const updatedAt = formatDate(animal.updatedAt);
  const createdAt = formatDate(animal.createdAt);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">System Info</CardTitle>
      </CardHeader>
      <CardContent className=" flex  justify-between pr-10">
        <ColumnOfInfo
          one={{
            title: "Updated",
            data: updatedAt,
            icon: <CheckCircle2 className="w-4 text-green-400" />,
          }}
          two={{
            title: "Added",
            data: createdAt,
            icon: <Clock className="w-4 text-blue-400" />,
          }}
        />
        {/* <section className=" flex flex-col gap-5">
          <article className="gap-4">

            <p className="text-sm font-medium">Updated</p>
            <div className="flex items-center gap-1">
              <CheckCircle2 className=" w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">{updatedAt}</p>
            </div>
          </article>
          <article className="gap-4">
            <p className="text-sm font-medium">Added</p>
            <div className="flex items-center gap-1">
              <Clock className=" w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">{createdAt}</p>
            </div>
          </article>
        </section> */}
        <ColumnOfInfo
          one={{
            title: "Chip Number",
            data: animal.chipNumber,
            icon: <Fingerprint className="w-4" />,
          }}
          two={{
            title: "Condition",
            data: animal.condition,
            icon: <ClipboardPlus className="w-4 text-red-400" />,
          }}
        />
        {/* <section className=" flex flex-col gap-5">
          <article className="gap-4">
            <p className="text-sm font-medium">Chip Number</p>
            <div className="flex items-center gap-1">
              <Fingerprint className=" w-4 " />
              <p className="text-sm text-muted-foreground">
                {animal.chipNumber}
              </p>
            </div>
          </article>
          <article className="gap-4">
            <p className="text-sm font-medium">Condition</p>
            <div className="flex items-center gap-1">
              <ClipboardPlus className=" w-4 text-red-400" />
              <p className="text-sm text-muted-foreground">
                {animal.condition}
              </p>
            </div>
          </article>
        </section> */}
      </CardContent>
    </Card>
  );
};

export default SystemInfoCard;
