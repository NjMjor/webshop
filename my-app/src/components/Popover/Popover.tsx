import "./Popover.css";
import { ReactNode, useContext, useState } from "react";
import { ThemeContext } from "../../AppWrap.tsx";

interface DropdownProps {
  children?: ReactNode;
  content?: ReactNode;
}

export default function Popover({ children, content }: DropdownProps) {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const onMouseEnter = () => {
    setIsOpen(true);
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={"popover"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isOpen && (
        <div
          style={{ color: theme.secondary, backgroundColor: theme.primary }}
          className={"popover-content"}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  );
}
