import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { COUNTRY_CODES } from "@/utils/data";

const PhoneCodeSelect = () => {
  return (
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
        <Input type="tel" placeholder="(555) 123-4567" className="flex-1" />
      </div>
    </div>
  );
};

export default PhoneCodeSelect;
