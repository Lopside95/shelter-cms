import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const AnimalCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square" />
      <CardHeader className="p-4 pb-2 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Skeleton className="h-3 w-1/3" />
      </CardFooter>
    </Card>
  );
};

export default AnimalCardSkeleton;
