import { IconPlus } from "../Icons/Icons";

const CreateButton = ({
  handleClick,
}: {
  handleClick: () => void;
}) => (
  <button
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      background: "var(--color-accent)",
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
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "var(--color-accent-hover)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "var(--color-accent)")
    }
  >
    <IconPlus />
    <span>Create</span>
  </button>
);

export default CreateButton;
