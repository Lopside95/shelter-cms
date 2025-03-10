"use client";
import ShelterInfo from "@/components/ShelterInfo";
import EditShelterContact from "@/components/EditShelterContact";
import { AnimalProps, FoodProps, ShelterProps } from "@/utils/types";
import AnimalsTabs from "@/components/cards/AnimalsTabs";
import AddAnimalForm from "../components/AddAnimalForm";
import { Card } from "@/components/ui/card";
import SingleShelterFood from "../components/SingleShelterFood";
import MyPieChart from "@/components/PieChart";
import { Species } from "@prisma/client";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import PieTwo, { DataItem } from "@/components/PieTwo";

interface ShelterProfileProps {
  shelter: ShelterProps;
  animals: AnimalProps[];
  food: FoodProps[];
}

const ShelterProfile = ({ shelter, animals, food }: ShelterProfileProps) => {
  const [theData, setTheData] = useState<DataItem[]>();

  if (!shelter || !animals || !food) {
    return <div>Loading...</div>;
  }

  // const getAnimals = animals.map((animal) => {
  //   return {
  //     name: animal.name,
  //     value: animal.species,
  //     color: () => {
  //       if (animal.species === Species.DOG) {
  //         return "#0e320d";
  //       }
  //       if (animal.species === Species.CAT) {
  //         return "#00ff00";
  //       }
  //     },
  //   };
  // });

  const dogs = animals.filter((animal) => animal.species === Species.DOG);
  const cats = animals.filter((animal) => animal.species === Species.CAT);
  const rabbits = animals.filter((animal) => animal.species === Species.RABBIT);
  const birds = animals.filter((animal) => animal.species === Species.BIRD);
  const others = animals.filter((animal) => animal.species === Species.OTHER);

  const chartData = [
    { name: "Dogs", value: dogs.length, color: "#0e320d" },
    { name: "Cats", value: cats.length, color: "#00ff00" },
    { name: "Rabbits", value: rabbits.length, color: "#0000ff" },
    { name: "Birds", value: birds.length, color: "#ffff00" },
    { name: "Others", value: others.length, color: "#ff00ff" },
  ];

  // const getChartData = () => {};

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ShelterInfo shelter={shelter} />
      <EditShelterContact />
      <div className="w-4/5 h-[300px]">
        <PieTwo {...chartData} />
      </div>

      {/* <AnimalsTabs animals={animals ? animals : []} /> */}
      <Card className="flex flex-col gap-5">
        <AddAnimalForm
          shelterId={shelter.id}
          shelterName={shelter.name}
          animalsLength={animals?.length}
        />
      </Card>

      {/* <SingleShelterFood food={food} /> */}
    </div>
  );
};

export default ShelterProfile;

{
  /* <PieTwo /> */
}

{
  /* <PieChart width={730} height={250}>
        <Pie
          data={theData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
        >
          {theData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart> */
}

{
  /* <PieChart width={730} height={250}>
        <Pie
          data={chartData}
          dataKey="name"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          // fill={(entry) => entry.payload.color}
        />
      </PieChart> */
}

{
  /* <MyPieChart data={animalsForChart} /> */
}

//here
// const dogsChart = dogs.map((dog) => {
//   return {
//     name: dog.name,
//     value: dogs.length,
//     color: "#0e320d",
//   };
// });

// const catsChart = cats.map((cat) => {
//   return {
//     name: cat.name,
//     value: cats.length,
//     color: "#00ff00",
//   };
// });

// const chartData = [
//   { name: "Dogs", value: dogs.length, color: "#0e320d" },
//   { name: "Cats", value: cats.length, color: "#00ff00" },
//   { name: "Rabbits", value: rabbits.length, color: "#0000ff" },
//   { name: "Birds", value: birds.length, color: "#ffff00" },
//   { name: "Others", value: others.length, color: "#ff00ff" },
// ];

// // const chartArrs = [dogs, cats, rabbits, birds, others];

// const dogsAndCats = [...dogsChart, ...catsChart];

// const animalsForChart = dogsAndCats.flatMap((animal) => {
//   return {
//     name: animal.name,
//     value: animal.value,
//     color: animal.color,
//   };
// });

// // const chartData = chartArrs.map((arr) => {
// //   return
// // })

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 278 },
//   { name: "Group F", value: 189 },
// ];
