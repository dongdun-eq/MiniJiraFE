import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../../hooks/useAuth";
import {
  ROUTE_PATH_HOME,
  ROUTE_PATH_REGISTER,
  FORM_FIELD_EMAIL,
  FORM_FIELD_PASSWORD,
  FORM_FIELD_REMEMBER_ME,
  HTML_ID_EMAIL,
  HTML_ID_PASSWORD,
  LOGIN_TEXT_SHOW,
  LOGIN_TEXT_HIDE,
  LOGIN_TEXT_LOGGING_IN,
  LOGIN_TEXT_LOG_IN,
  LOGIN_VALIDATION_EMAIL_REQUIRED,
  LOGIN_VALIDATION_EMAIL_INVALID,
  LOGIN_VALIDATION_PASSWORD_REQUIRED,
  EMAIL_REGEX_PATTERN,
} from "../../constants";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      [FORM_FIELD_EMAIL]: "",
      [FORM_FIELD_PASSWORD]: "",
      [FORM_FIELD_REMEMBER_ME]: false,
    },
    mode: "onTouched",
  });

  const toRegister = () => {
    navigate(ROUTE_PATH_REGISTER);
  };

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
    navigate(ROUTE_PATH_HOME);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logoMark}>
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8l3 3M11 8l-3 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className={styles.loginTitle}>Welcome back to MiniJira</h1>
          <p className={styles.loginSubtitle}>
            Enter your credentials to access your sprint board
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginForm}
          noValidate
        >
          <div className={styles.inputGroup}>
            <label htmlFor={HTML_ID_EMAIL} className={styles.inputLabel}>
              Email Address
            </label>
            <input
              type="email"
              id={HTML_ID_EMAIL}
              className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
              placeholder="name@company.com"
              {...register(FORM_FIELD_EMAIL, {
                required: LOGIN_VALIDATION_EMAIL_REQUIRED,
                pattern: {
                  value: EMAIL_REGEX_PATTERN,
                  message: LOGIN_VALIDATION_EMAIL_INVALID,
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor={HTML_ID_PASSWORD} className={styles.inputLabel}>
                Password
              </label>
              <a href="#forgot" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id={HTML_ID_PASSWORD}
                className={`${styles.inputField} ${errors.password ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register(FORM_FIELD_PASSWORD, {
                  required: LOGIN_VALIDATION_PASSWORD_REQUIRED,
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? LOGIN_TEXT_HIDE : LOGIN_TEXT_SHOW}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.rememberGroup}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" {...register(FORM_FIELD_REMEMBER_ME)} />
              <span className={styles.checkboxCheckmark}></span>
              <span className={styles.checkboxLabel}>Keep me logged in</span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? LOGIN_TEXT_LOGGING_IN : LOGIN_TEXT_LOG_IN}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialGroup}>
          <button
            type="button"
            onClick={toRegister}
            className={styles.socialBtn}
          >
            <b>Register</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
