"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { shelterSchema, ShelterSchema } from "@/utils/schemas";
import TextField from "@/components/TextFormField";
import NumberField from "@/components/NumberField";
import TextInput from "./TextInput";
import React from "react";

type FindShelterProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btn?: string;
  title?: string;
  desc?: string;
};

const FindShelter = ({
  onClick,
  btn,
  children,
  title,
  desc,
}: FindShelterProps) => {
  return (
    <Card className=" w-3/4 px-20 mx-auto">
      <CardHeader>
        <CardTitle>{title || "Find Shelter"}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <Button onClick={onClick}>{btn || "Submit"}</Button>
    </Card>
  );
};

export default FindShelter;
