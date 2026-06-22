import { useNavigate } from "react-router-dom";
import {
  IconChart,
  IconList,
  IconLogin,
  IconSettings,
  LayoutGrid,
} from "../Icons/Icons";
import styles from "./Sidebar.module.css";

const navItems = [
  { id: "board", label: "Board", icon: <LayoutGrid />, active: true },
  { id: "backlog", label: "Backlog", icon: <IconList /> },
  { id: "reports", label: "Reports", icon: <IconChart /> },
  { id: "settings", label: "Settings", icon: <IconSettings /> },
];

interface Props {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ sidebarOpen, closeSidebar }: Props) => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      {/* Top: Logo */}
      <div className={styles.sidebarLogo}>
        <div className={styles.logoMark}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8l3 3M11 8l-3 3"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className={styles.logoText}>MiniJira</div>
          <div className={styles.logoSub}>Sprint Board</div>
        </div>
      </div>

      {/* Middle: Navigation */}
      <nav className={styles.navSection}>
        <div className={styles.navLabel}>Planning</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            onClick={closeSidebar}
          >
            {item.icon}
            <span className={styles.navItemText}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* --- BOTTOM: FOOTER (NÚT ĐĂNG NHẬP THÊM Ở ĐÂY) --- */}
      <div className={styles.sidebarFooter}>
        <button className={styles.loginBtn} onClick={toLogin}>
          <IconLogin />
          <span className={styles.navItemText}>Log In</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
