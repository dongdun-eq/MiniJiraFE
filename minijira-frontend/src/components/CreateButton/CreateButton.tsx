import { IconPlus } from "../Icons/Icons";
import {
  CREATE_BUTTON_ARIA_LABEL,
  CREATE_BUTTON_TEXT,
  CREATE_BUTTON_KEYSHORTCUTS_DEFAULT,
  COLOR_ACCENT_DEFAULT,
  COLOR_ACCENT_HOVER,
} from "../../constants";

interface CreateButtonProps {
  handleClick: () => void;
  "aria-keyshortcuts"?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  handleClick,
  "aria-keyshortcuts": keyShortcuts = CREATE_BUTTON_KEYSHORTCUTS_DEFAULT, 
}) => (
  <button
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      background: COLOR_ACCENT_DEFAULT, 
      color: "#fff",
      border: "none",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background var(--transition-fast)",
      fontFamily: "var(--font-sans)",
      whiteSpace: "nowrap",
    }}
    onClick={handleClick}
    onMouseEnter={
      (e) => (e.currentTarget.style.background = COLOR_ACCENT_HOVER) 
    }
    onMouseLeave={
      (e) => (e.currentTarget.style.background = COLOR_ACCENT_DEFAULT) 
    }
    aria-label={CREATE_BUTTON_ARIA_LABEL} 
    aria-keyshortcuts={keyShortcuts}
  >
    <span aria-hidden="true">
      <IconPlus />
    </span>
    <span>{CREATE_BUTTON_TEXT}</span> 
  </button>
);

export default CreateButton;
