import { useNavigate } from "react-router-dom";
import {
  IconChart,
  IconList,
  IconLogin,
  IconSettings,
  LayoutGrid,
} from "../Icons/Icons";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../hooks/useAuth";
import {
  ROUTE_LOGIN,
  ARIA_CURRENT_PAGE,
  SIDEBAR_ARIA_LABEL,
  SIDEBAR_NAV_ARIA_LABEL_SUFFIX,
  SIDEBAR_LOG_IN_TEXT,
  SIDEBAR_LOG_OUT_TEXT,
  SIDEBAR_WELCOME_PREFIX,
  SIDEBAR_AVATAR_FALLBACK_DEFAULT,
  SIDEBAR_ARIA_LOGIN,
  SIDEBAR_ARIA_LOGOUT_PREFIX,
  HTML_ID_MAIN_SIDEBAR,
} from "../../constants";
import React from "react";

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
  const { user, isLoggedIn, logout } = useAuth();

  const toLogin = () => {
    navigate(ROUTE_LOGIN);
  };

  const getAvatarFallback = (name?: string) => {
    if (!name) return SIDEBAR_AVATAR_FALLBACK_DEFAULT;
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <aside
      id={HTML_ID_MAIN_SIDEBAR}
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
      aria-expanded={sidebarOpen}
      aria-label={SIDEBAR_ARIA_LABEL}
    >
      {/* Top: Logo */}
      <div className={styles.sidebarLogo} aria-hidden="true">
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
      <nav className={styles.navSection} aria-labelledby="nav-planning-label">
        <div id="nav-planning-label" className={styles.navLabel}>
          Planning
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            onClick={closeSidebar}
            aria-current={item.active ? ARIA_CURRENT_PAGE : undefined}
            aria-label={`${item.label} ${SIDEBAR_NAV_ARIA_LABEL_SUFFIX}`}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className={styles.navItemText}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* --- BOTTOM: FOOTER --- */}
      <div className={styles.sidebarFooter}>
        {isLoggedIn && user ? (
          <div className={styles.userProfile}>
            <div className={styles.avatar} aria-hidden="true">
              {getAvatarFallback(user.name)}
            </div>
            <div className={styles.userInfo} aria-hidden="true">
              <div className={styles.welcomeText}>{SIDEBAR_WELCOME_PREFIX}</div>
              <div className={styles.userName} title={user.name}>
                {user.name}
              </div>
            </div>
            <button
              className={styles.logoutBtn}
              onClick={logout}
              title={SIDEBAR_LOG_OUT_TEXT}
              aria-label={`${SIDEBAR_ARIA_LOGOUT_PREFIX} ${user.name}`}
            >
              {SIDEBAR_LOG_OUT_TEXT}
            </button>
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={toLogin}
            aria-label={SIDEBAR_ARIA_LOGIN}
          >
            <span aria-hidden="true">
              <IconLogin />
            </span>
            <span className={styles.navItemText}>{SIDEBAR_LOG_IN_TEXT}</span>{" "}
          </button>
        )}
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
