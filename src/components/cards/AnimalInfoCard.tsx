import { Card, CardContent, CardHeader } from "../ui/card";

type AnimalInfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  val1?: number | string;
  val2?: number | string;
  // species: string;
  // breed: string;
};

const AnimalInfoCard = ({
  icon,
  title,
  description,
  val1,
  val2,
}: //   value,
AnimalInfoCardProps) => {
  return (
    <Card className="flex items-center text-center gap-16 ">
      {/* <CardHeader></CardHeader> */}
      <CardContent className="justify-self-end">
        <h2>{val1}</h2>
        <h2>{val2}</h2>
      </CardContent>
    </Card>
  );
};

export default AnimalInfoCard;

// <Card className="flex items-center text-center gap-16 ">
//   <CardHeader>
//     <div className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
//       {icon}
//     </div>
//     <h3 className="text-lg font-bold mb-2">{title}</h3>
//   </CardHeader>
//   <CardContent className="justify-self-end">

//   </CardContent>
// </Card>
