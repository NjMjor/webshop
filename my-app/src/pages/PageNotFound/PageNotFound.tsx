import "./PageNotFound.css";
import { useContext } from "react";
import { ThemeContext } from "../../AppWrap.tsx";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";

export default function PageNotFound() {
  const theme = useContext(ThemeContext);
  return (
    <PageWrapper>
      <div
        style={{ backgroundColor: theme.background, color: theme.foreground }}
      >
        Page not found!
      </div>
    </PageWrapper>
  );
}
