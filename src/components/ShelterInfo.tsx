import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ShelterProps } from "@/utils/types";

const ShelterInfo = ({ shelter }: { shelter: ShelterProps }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-3xl font-bold">{shelter.name}</CardTitle>
            <CardDescription className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              {shelter.location}
            </CardDescription>
          </div>
          <Button>Edit Shelter</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>{shelter.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>{shelter.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterInfo;
