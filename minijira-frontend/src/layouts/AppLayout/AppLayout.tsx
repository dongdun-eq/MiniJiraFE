import React, { useState } from "react";
import styles from "./AppLayout.module.css";
import { IconClose, IconMenu } from "../../components/Icons/Icons";
import CreateButton from "../../components/CreateButton/CreateButton";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { openCreate } = useTaskModalContext();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className={styles.root}>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.visible : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <IconClose /> : <IconMenu />}
          </button>

          <h1 className={styles.topbarTitle}>Sprint Board</h1>

          <div className={styles.topbarSpacer} />

          <div className={styles.topbarActions}>
            <CreateButton handleClick={openCreate} />
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
