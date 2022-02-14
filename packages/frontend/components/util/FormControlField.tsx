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
  
  type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    placeholder: string | boolean;
    name: string;
    helper?: string;
    variant?: "input" | "checkbox";
  };
  
  export const FormInputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    helper,
    variant = "input",
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
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  };