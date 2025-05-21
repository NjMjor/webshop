import "./AppMenuButton.css";
import { useContext } from "react";
import { ThemeContext } from "../../../../AppWrap.tsx";

interface AppMenuButtonProps {
  label: string;
  onClick?: () => void;
  badgeCount?: number;
}

export default function AppMenuButton({
  label,
  onClick,
  badgeCount,
}: AppMenuButtonProps) {
  const theme = useContext(ThemeContext);
  const displayBadge = badgeCount ? badgeCount > 0 : false;

  return (
    <div className={"app-menu-button-wrapper"}>
      {displayBadge && (
        <span
          style={{ backgroundColor: theme.backgroundTwo }}
          className={"app-menu-button-badge"}
        >
          {badgeCount}
        </span>
      )}
      <span onClick={onClick} className={"app-menu-button"}>
        {label}
      </span>
    </div>
  );
}
