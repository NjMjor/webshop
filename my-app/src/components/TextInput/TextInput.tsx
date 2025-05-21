import "./TextInput.css";
import type { ChangeEvent, RefObject } from "react";

interface TextInputProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  placeHolder?: string;
  disableError?: boolean;
  ref?: RefObject<HTMLInputElement | null>;
}

export default function TextInput({
  label,
  name,
  value,
  onChange,
  type,
  error,
  ref,
  disableError,
  placeHolder,
}: TextInputProps) {
  return (
    <div className={"text-input-wrapper"}>
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        type={type ?? "text"}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeHolder}
      />
      {!disableError && (
        <div style={{ color: "red", minHeight: "2rem" }}>{error}</div>
      )}
    </div>
  );
}
