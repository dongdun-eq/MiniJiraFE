import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styles from "./Register.module.css";
import type { RegisterDto } from "../../types/auth.type";
import {
  ROUTE_PATH_LOGIN,
  FORM_FIELD_NAME,
  FORM_FIELD_EMAIL,
  FORM_FIELD_AVATAR_URL,
  FORM_FIELD_PASSWORD,
  FORM_FIELD_CONFIRM_PASSWORD,
  HTML_ID_NAME,
  HTML_ID_EMAIL,
  HTML_ID_IMAGE_URL,
  HTML_ID_PASSWORD,
  HTML_ID_CONFIRM_PASSWORD,
  REGISTER_TEXT_SHOW,
  REGISTER_TEXT_HIDE,
  REGISTER_TEXT_CREATING_ACCOUNT,
  REGISTER_TEXT_SIGN_UP,
  REGISTER_VALIDATION_NAME_REQUIRED,
  REGISTER_VALIDATION_EMAIL_REQUIRED,
  REGISTER_VALIDATION_EMAIL_INVALID,
  REGISTER_VALIDATION_URL_INVALID,
  REGISTER_VALIDATION_PASSWORD_REQUIRED,
  REGISTER_VALIDATION_CONFIRM_PASSWORD_REQUIRED,
  REGISTER_VALIDATION_PASSWORD_MISMATCH,
  EMAIL_REGEX_PATTERN,
  URL_REGEX_PATTERN,
} from "../../constants";
import { useAuthMutations } from "../../hooks/auth.hook";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  name: string;
  password: string;
  email: string;
  avatarUrl?: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      [FORM_FIELD_NAME]: "",
      [FORM_FIELD_EMAIL]: "",
      [FORM_FIELD_PASSWORD]: "",
      [FORM_FIELD_CONFIRM_PASSWORD]: "",
      [FORM_FIELD_AVATAR_URL]: "",
    },
    mode: "onTouched",
  });

  const { register: registerUser, isRegistering } = useAuthMutations();
  const navigate = useNavigate()
  const passwordValue = useWatch({ name: FORM_FIELD_PASSWORD, control });

  const onSubmit = async (data: RegisterFormData) => {
    const registerDto: RegisterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
    };
    try {
      await registerUser(registerDto);
      navigate(ROUTE_PATH_LOGIN);
    } catch {
      /* empty */
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
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
          <h1 className={styles.registerTitle}>Create your account</h1>
          <p className={styles.registerSubtitle}>
            Get started with your agile boards today
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registerForm}
          noValidate
        >
          <div className={styles.inputGroup}>
            <label htmlFor={HTML_ID_NAME} className={styles.inputLabel}>
              Full Name
            </label>
            <input
              type="text"
              id={HTML_ID_NAME}
              className={`${styles.inputField} ${errors.name ? styles.inputError : ""}`}
              placeholder="John Doe"
              {...register(FORM_FIELD_NAME, {
                required: REGISTER_VALIDATION_NAME_REQUIRED,
              })}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

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
                required: REGISTER_VALIDATION_EMAIL_REQUIRED,
                pattern: {
                  value: EMAIL_REGEX_PATTERN,
                  message: REGISTER_VALIDATION_EMAIL_INVALID,
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={HTML_ID_IMAGE_URL} className={styles.inputLabel}>
              Avatar URL (Optional)
            </label>
            <input
              type="url"
              id={HTML_ID_IMAGE_URL}
              className={`${styles.inputField} ${errors.avatarUrl ? styles.inputError : ""}`}
              placeholder="https://example.com/avatar.jpg"
              {...register(FORM_FIELD_AVATAR_URL, {
                pattern: {
                  value: URL_REGEX_PATTERN,
                  message: REGISTER_VALIDATION_URL_INVALID,
                },
              })}
            />
            {errors.avatarUrl && (
              <span className={styles.errorText}>
                {errors.avatarUrl.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={HTML_ID_PASSWORD} className={styles.inputLabel}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id={HTML_ID_PASSWORD}
                className={`${styles.inputField} ${styles.passwordInput} ${errors.password ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register(FORM_FIELD_PASSWORD, {
                  required: REGISTER_VALIDATION_PASSWORD_REQUIRED,
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? REGISTER_TEXT_HIDE : REGISTER_TEXT_SHOW}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label
              htmlFor={HTML_ID_CONFIRM_PASSWORD}
              className={styles.inputLabel}
            >
              Confirm Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id={HTML_ID_CONFIRM_PASSWORD}
                className={`${styles.inputField} ${styles.passwordInput} ${errors.confirmPassword ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register(FORM_FIELD_CONFIRM_PASSWORD, {
                  required: REGISTER_VALIDATION_CONFIRM_PASSWORD_REQUIRED,
                  validate: (value) =>
                    value === passwordValue ||
                    REGISTER_VALIDATION_PASSWORD_MISMATCH,
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? REGISTER_TEXT_HIDE : REGISTER_TEXT_SHOW}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

           <button
            type="submit"
            className={styles.submitBtn}
            disabled={isRegistering}
          >
            {isRegistering || isSubmitting
              ? REGISTER_TEXT_CREATING_ACCOUNT
              : REGISTER_TEXT_SIGN_UP}
          </button>
        </form>

        <div className={styles.loginRedirect}>
          Already have an account? <a href={ROUTE_PATH_LOGIN}>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
