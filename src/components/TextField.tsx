import { FormInput } from "@/utils/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

const TextField = ({ name, type, label }: FormInput) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <FormControl>
              <Input {...field} className="w-80" type={type} />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};

export default TextField;
