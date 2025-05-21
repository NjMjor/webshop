import "./Spinner.css";
import { ReactNode } from "react";

type SpinnerSize = "small" | "normal" | "large";

interface SpinnerProps {
  isLoading: boolean;
  children?: ReactNode;
  size?: SpinnerSize;
}

function getSpinnerSize(spinnerSize: SpinnerSize) {
  switch (spinnerSize) {
    case "small":
      return "10px";
    case "normal":
      return "25px";
    case "large":
      return "50px";
  }
}

export default function Spinner({ isLoading, children, size }: SpinnerProps) {
  const spinnerSize = getSpinnerSize(size ?? "normal");

  if (isLoading) {
    if (!children) return <div className={"spinner"}></div>;
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{ width: spinnerSize, height: spinnerSize }}
          className={"spinner-overlay"}
        ></div>
        <div style={{ opacity: 0.5 }}>{children}</div>
      </div>
    );
  }
  return <>{children}</>;
}
