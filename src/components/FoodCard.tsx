import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FoodProps } from "@/utils/types";

const FoodCard = ({ food }: { food: FoodProps }) => {
  return (
    <Card key={food.id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{food.type}</h3>
            <p className="text-sm text-gray-500">{food.brand}</p>
          </div>
          <Badge variant="secondary">Qty: {food.quantity}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
