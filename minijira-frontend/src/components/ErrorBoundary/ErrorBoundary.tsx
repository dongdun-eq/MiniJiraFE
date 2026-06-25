import React from "react";
import styles from "./ErrorBoundary.module.css";
import {
  ENV_DEVELOPMENT,
  ERROR_BOUNDARY_DEFAULT_TITLE,
  ERROR_BOUNDARY_DEFAULT_MESSAGE,
  ERROR_BOUNDARY_BTN_RETRY,
  ERROR_BOUNDARY_BTN_RELOAD,
  ERROR_BOUNDARY_ARIA_ROLE,
  ERROR_BOUNDARY_LOG_PREFIX,
} from "../../constants";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentCatch(error: Error, info: React.ErrorInfo) {
    console.error(ERROR_BOUNDARY_LOG_PREFIX, error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (fallback) return fallback(error, this.reset);

      return (
        <div className={styles.container} role={ERROR_BOUNDARY_ARIA_ROLE}>
          {" "}
          <div className={styles.card}>
            <span aria-hidden="true" className={styles.icon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 12v10M20 27v.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h2 className={styles.title}>{ERROR_BOUNDARY_DEFAULT_TITLE}</h2>{" "}
            <p className={styles.message}>
              {ERROR_BOUNDARY_DEFAULT_MESSAGE}
            </p>{" "}
            {import.meta.env.ENV === ENV_DEVELOPMENT && (
              <pre className={styles.devDetails}>{error.message}</pre>
            )}
            <div className={styles.actions}>
              <button className={styles.btnSecondary} onClick={this.reset}>
                {ERROR_BOUNDARY_BTN_RETRY} 
              </button>
              <button
                className={styles.btnPrimary}
                onClick={() => window.location.reload()}
              >
                {ERROR_BOUNDARY_BTN_RELOAD}{" "}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
