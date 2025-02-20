import { FormInput } from "@/utils/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

const NumberField = ({ name, type, label, desc }: FormInput) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <FormControl>
              <Input
                type="number"
                placeholder="Enter latitude"
                {...field}
                onChange={(e) =>
                  field.onChange(Number.parseFloat(e.target.value))
                }
              />

              {/* <Input {...field} className="w-80" type={type} /> */}
            </FormControl>
            <FormDescription>{desc}</FormDescription>
          </FormItem>
        </>
      )}
    />
  );
};

export default NumberField;

{
  /* <FormField
control={form.control}
name="longitude"
render={({ field }) => (
  <FormItem>
    <FormLabel>Longitude</FormLabel>
    <FormControl>
      <Input
        type="number"
        placeholder="Enter longitude"
        {...field}
        onChange={(e) =>
          field.onChange(Number.parseFloat(e.target.value))
        }
      />
    </FormControl>
    <FormDescription>Range: -180 to 180</FormDescription>
    <FormMessage />
  </FormItem>
)}
/> */
}
