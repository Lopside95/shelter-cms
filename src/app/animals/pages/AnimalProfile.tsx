"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import Link from "next/link";
import Image from "next/image";
import AnimalInfoCard from "@/components/cards/AnimalInfoCard";
import { AnimalProps, ShelterProps } from "@/utils/types";
import FeatureCard from "@/components/cards/FeatureCard";
import { api } from "@/app/trpc/client";
import { useRouter } from "next/navigation";

import SystemInfoCard from "@/components/cards/SystemInfoCard";

type AnimalProfileProps = {
  animal: AnimalProps;
  shelter: ShelterProps | null;
};

const AnimalProfile = ({ data }: { data: AnimalProfileProps }) => {
  const router = useRouter();

  const { animal, shelter } = data;

  const deleteAnimal = api.animals.deleteAnimal.useMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAnimal.mutateAsync(animal.id);

      if (res?.code === 200) {
        alert("Animal deleted successfully");
        router.push("/animals");
      }

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("animal.condition", animal.condition);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/shelters"
          className="flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shelter
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <span className="text-sm text-muted-foreground">Animal Profile</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={"/icons/dog.png"}
                // src={animal.image || "/icons/dog.png"}
                alt={animal.name}
                fill
                className="object-cover"
              />
            </div>
            {/* <div className="px-2">
              <h1 className="">{animal.name}</h1>
              <p className="text-muted-foreground ">{animal.breed}</p>
            </div> */}

            {/* <div className="p-5 justify-between items-center">
              <div className="flex  justify-between py-1 items-center">
                <h2>Name</h2>
                <h1 >{animal.name}</h1>
              </div>
              <div className="flex justify-between items-center">
                <h3>Breed</h3>
                <h1>{animal.breed}</h1>
              </div>
            </div> */}
            <div className="flex p-5 justify-between items-center">
              <h1>{animal.name}</h1>
              <p>{animal.breed}</p>
            </div>

            {/* <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">{animal.name}</h1>
              <p className="text-muted-foreground">
                {animal.species} • {animal.breed}
              </p>
            </div> */}
          </CardContent>
          {/* <div className="flex flex-col gap-2 p-4 items-center">
            <Button variant="link" size="icon" onClick={handleDelete}>
              <Pencil className="h-4 w-4" />
              <span className="">Remove animal</span>
            </Button>
            <Button variant="link" size="icon">
              <Pencil className="h-4 w-4" />
              <span className="">Transfer to a different shelter</span>
            </Button>
          </div> */}
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Basic Information
              </CardTitle>
              <EditAnimalDialog animal={animal} />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <p>{animal.age}</p>
              <p>{shelter?.name}</p>
              <p>{animal.age}</p>
            </CardContent>
          </Card>

          <SystemInfoCard animal={animal} />
          {/* 
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Animal ID</span>
                <span className="text-sm font-mono">{animal.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Last Updated
                </span>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

function EditAnimalDialog({ animal }: { animal: AnimalProps }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit animal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Animal Profile</DialogTitle>
          <DialogDescription>
            Make changes to the animal&apos;s profile information here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={animal.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="species">Species</Label>
            <Input id="species" defaultValue={animal.species} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" defaultValue={animal.breed} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" defaultValue={animal.age} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="chipNumber">Chip Number</Label>
            <Input id="chipNumber" defaultValue={animal.chipNumber} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AnimalProfile;

{
  /* <AnimalInfoCard
                icon={<Paw className="h-4 w-4" />}
                title="Species"
                species={animal.species}
                breed={animal.breed}
              /> */
}
{
  /* <AnimalInfoCard
                icon={<Paw className="h-4 w-4" />}
                title="Breed"
                value={animal.breed}
              /> */
}
{
  /* <AnimalInfoCard
                icon={<Calendar className="h-4 w-4" />}
                title="Age"
                val1={animal.age}
                val2={animal.condition}
              /> */
}
// <Card className="flex items-center text-center gap-16 ">
{
  /* <CardHeader></CardHeader> */
}
{
  /* <CardContent className="justify-self-end">
                  <h2>Age {animal.age}</h2>
                  <h2>Condition {animal.condition}</h2>
                  <h2>{}</h2>
                </CardContent>
              </Card>
              {animal.shelterId ? (
                <FeatureCard
                  icon={<Building2 className="h-4 w-4" />}
                  title="Shelter"
                  value={animal.shelterId}
                  description={shelter?.name}
                />
              ) : (
                <FeatureCard
                  icon={<Building2 className="h-4 w-4" />}
                  title="Shelter ID"
                  value="No Shelter"
                />
              )} */
}
{
  /* <FeatureCard
                icon={<QrCode className="h-4 w-4" />}
                title="Chip Number"
                value={animal.chipNumber}
              /> */
}
