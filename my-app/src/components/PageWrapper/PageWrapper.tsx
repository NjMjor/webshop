import "./PageWrapper.css";
import { useContext } from "react";
import { ThemeContext } from "../../AppWrap.tsx";

interface PageWrapperProps {
  children?: any;
}
export default function PageWrapper({ children }: PageWrapperProps) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={"page-wrapper"}
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      {children}
    </div>
  );
}
