import { Card, CardContent, CardHeader } from "../ui/card";

type AnimalInfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  //   value?: number | string;
  species: string;
  breed: string;
};

const FeatureCard = ({
  icon,
  title,
  description,
  species,
  breed,
}: //   value,
AnimalInfoCardProps) => {
  return (
    <Card className="flex items-center text-center gap-16 ">
      {/* <CardHeader>
        <div className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
      </CardHeader> */}
      <CardContent className="justify-self-end">
        <article>
          <p>Species</p>
          <p className="text-gray-500 dark:text-gray-400">{species}</p>
        </article>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
