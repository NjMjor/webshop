import { CSSProperties, MouseEvent, useContext } from "react";
import "./Button.css";
import Spinner from "../Spinner/Spinner.tsx";
import { ThemeContext } from "../../AppWrap.tsx";

interface ButtonProps {
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function Button({
  label,
  onClick,
  type,
  isLoading,
  style,
  className,
}: ButtonProps) {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={"button-wrapper " + (className ?? "")}
      style={{ ...style, color: theme.primary }}
    >
      <button
        style={{ color: theme.foreground, backgroundColor: theme.background }}
        type={type ?? "submit"}
        className={`button ${isLoading ? "button-loading" : ""}`}
        onClick={!isLoading ? onClick : undefined}
      >
        <div className={"button-content"}>
          <Spinner isLoading={isLoading ?? false} />
          <div>{label}</div>
        </div>
      </button>
    </div>
  );
}
