import { FormInput } from "@/utils/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

const TextField = ({ name, type, label, desc, placeholder, cn }: FormInput) => {
  const { control, getFieldState } = useFormContext();

  const fieldStyle = `w-80 ${cn}`;

  const error = getFieldState(name).error;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${error?.message ? "hidden" : ""}`}>
            {label}
          </FormLabel>
          <FormMessage />
          <FormControl>
            <Input
              {...field}
              className={fieldStyle}
              type={type}
              placeholder={placeholder}
            />
          </FormControl>
          <FormDescription>{desc}</FormDescription>
        </FormItem>
      )}
    />
  );
};

export default TextField;
