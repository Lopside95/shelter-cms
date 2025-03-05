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
} from "lucide-react";
import { formatDate } from "@/utils/helpers";

type TimeDetailsProps = {
  updatedAt: Date;
  createdAt: Date;
};

const TimeDetailsCard = ({ updatedAt, createdAt }: TimeDetailsProps) => {
  const lastUpdated = formatDate(updatedAt);

  const added = formatDate(createdAt);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Timeline</CardTitle>
      </CardHeader>
      <CardContent className=" space-y-4">
        <div className="flex items-start gap-4">
          <div className="min-w-4">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Last updated</p>
            <p className="text-sm text-muted-foreground">{lastUpdated}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="min-w-4">
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Added to System</p>
            <p className="text-sm text-muted-foreground">{added}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeDetailsCard;
