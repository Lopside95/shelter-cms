import { TextInputType } from "@/utils/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const TextInput = ({
  name,
  type,
  label,
  onChange,
  desc,
  placeholder,
  cn,
  txtCn,
  labelCn,
}: TextInputType) => {
  const inputStyle = `w-80 ${txtCn}`;
  return (
    <div className={cn}>
      <Label className={labelCn}>{label}</Label>
      <Input
        onChange={onChange}
        className={inputStyle}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
