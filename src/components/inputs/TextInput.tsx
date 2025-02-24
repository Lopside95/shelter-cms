import { TextInputType } from "@/utils/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
