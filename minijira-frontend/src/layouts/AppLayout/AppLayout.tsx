import React, { useMemo, useState, useEffect, useCallback } from "react";
import styles from "./AppLayout.module.css";
import { IconClose, IconMenu } from "../../components/Icons/Icons";
import CreateButton from "../../components/CreateButton/CreateButton";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";
import { debounce } from "ts-debounce";
import useTaskFilters from "../../hooks/useTaskFilters";
import {
  KEYBOARD_KEY_N,
  HTML_TAG_INPUT,
  HTML_TAG_TEXTAREA,
  HTML_ATTR_CONTENTEDITABLE,
  HTML_ATTR_TRUE,
  HTML_ID_MAIN_SIDEBAR,
  APP_LAYOUT_BANNER_ROLE,
  APP_LAYOUT_SEARCH_ROLE,
  APP_LAYOUT_TITLE,
  APP_LAYOUT_SEARCH_PLACEHOLDER,
  APP_LAYOUT_ARIA_CLOSE_MENU,
  APP_LAYOUT_ARIA_OPEN_MENU,
  APP_LAYOUT_ARIA_SEARCH_TASKS,
  APP_LAYOUT_ARIA_CLEAR_SEARCH,
  APP_LAYOUT_ARIA_MAIN_CONTENT,
  APP_LAYOUT_KEY_SHORTCUT_CREATE,
} from "../../constants";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { params, setParams } = useTaskFilters();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(params.search ?? "");

  const { openCreate } = useTaskModalContext();

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setParams({ search: value });
    }, 500);
  }, [setParams]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === KEYBOARD_KEY_N) {
        const activeElement = document.activeElement;
        if (
          activeElement &&
          (activeElement.tagName === HTML_TAG_INPUT ||
            activeElement.tagName === HTML_TAG_TEXTAREA ||
            activeElement.getAttribute(HTML_ATTR_CONTENTEDITABLE) ===
              HTML_ATTR_TRUE)
        ) {
          return;
        }

        event.preventDefault();
        openCreate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openCreate]);

  return (
    <div className={styles.root}>
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.visible : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div className={styles.main}>
        <header className={styles.topbar} role={APP_LAYOUT_BANNER_ROLE}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen((o) => !o)}
            aria-expanded={sidebarOpen}
            aria-controls={HTML_ID_MAIN_SIDEBAR}
            aria-label={
              sidebarOpen
                ? APP_LAYOUT_ARIA_CLOSE_MENU
                : APP_LAYOUT_ARIA_OPEN_MENU
            }
          >
            <span aria-hidden="true">
              {sidebarOpen ? <IconClose /> : <IconMenu />}
            </span>
          </button>

          <h1 className={styles.topbarTitle}>{APP_LAYOUT_TITLE}</h1>

          <div className={styles.searchWrapper} role={APP_LAYOUT_SEARCH_ROLE}>
            <input
              type="text"
              placeholder={APP_LAYOUT_SEARCH_PLACEHOLDER}
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                debouncedSearch(value);
              }}
              aria-label={APP_LAYOUT_ARIA_SEARCH_TASKS}
            />
            {searchValue && (
              <button
                type="button"
                className={styles.searchClear}
                onClick={() => {
                  setSearchValue("");
                  debouncedSearch("");
                }}
                aria-label={APP_LAYOUT_ARIA_CLEAR_SEARCH}
              >
                <span aria-hidden="true">
                  <IconClose />
                </span>
              </button>
            )}
          </div>

          <div className={styles.topbarSpacer} />

          <div className={styles.topbarActions}>
            <CreateButton
              handleClick={openCreate}
              aria-keyshortcuts={APP_LAYOUT_KEY_SHORTCUT_CREATE}
            />
          </div>
        </header>

        <main
          className={styles.content}
          aria-label={APP_LAYOUT_ARIA_MAIN_CONTENT}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
