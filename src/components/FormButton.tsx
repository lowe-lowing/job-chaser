import { type FC } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

const FormButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} {...props}>
      {props.children}
    </Button>
  );
};

export default FormButton;
