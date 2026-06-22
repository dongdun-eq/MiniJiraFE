import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  // Khởi tạo React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
  });

  const toRegister = () => {
    navigate("/register");
  };

  // Hàm handle submit chuẩn bài của React Hook Form
  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
    navigate("/");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Header: Logo & Title */}
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

        {/* Form Đăng nhập */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginForm}
          noValidate
        >
          {/* Email Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
              placeholder="name@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <a href="#forgot" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`${styles.inputField} ${errors.password ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember me Checkbox */}
          <div className={styles.rememberGroup}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" {...register("rememberMe")} />
              <span className={styles.checkboxCheckmark}></span>
              <span className={styles.checkboxLabel}>Keep me logged in</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        {/* Social Logins */}
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
