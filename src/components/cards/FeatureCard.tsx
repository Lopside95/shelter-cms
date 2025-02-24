import { Card, CardContent, CardHeader } from "../ui/card";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  value?: number | string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader className="mb-4 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
        {icon}
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
