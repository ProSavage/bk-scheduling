import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps =  {
  label: string;
  placeholder: string | number | boolean;
  name: string;
  helper?: string;
  variant?: "input" | "checkbox";
  showError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  helper,
  variant = "input",
  showError = true,
  ...props
}) => {
  const [field, { error }] = useField(props);

  const renderInput = () => {
    if (variant === "checkbox") {
      return (
        <Checkbox size={"lg"} {...field} {...props} aria-invalid={true}>
          {label}
        </Checkbox>
      );
    } else {
      return (
        <Input
          borderColor={"gray.500"}
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      );
    }
  };

  return (
    <FormControl isInvalid={!!error}>
      {variant === "input" ? (
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
      ) : null}
      {renderInput()}
      {helper ? <FormHelperText>{helper}</FormHelperText> : null}
      {showError ? error ? <FormErrorMessage>{error}</FormErrorMessage> : null : null}
    </FormControl>
  );
};