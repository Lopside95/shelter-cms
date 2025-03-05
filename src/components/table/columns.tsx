"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FoodProps } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { access } from "fs";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export type FoodTableProps = {
  name: string;
  brand: string;
  quantity: number;
  type: string;
  shelterId: number;
  updatedAt: Date;
};

export const columns: ColumnDef<FoodTableProps>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      //   const amount = parseFloat(row.getValue("amount"))
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(amount)

      return <div className="text-right font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "brand",
    cell: ({ row }) => {
      const name: string = row.getValue("brand");
      //   const amount = parseFloat(row.getValue("amount"))
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(amount)

      return <div className="text-right font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "shelterId",
    header: "Shelter Id",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const name = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(name.name)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
