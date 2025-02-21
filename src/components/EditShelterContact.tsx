import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { COUNTRY_CODES } from "@/utils/data";

const EditShelterContact = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex gap-2">
              <Select defaultValue="+1">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="contact@shelter.example" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditShelterContact;
