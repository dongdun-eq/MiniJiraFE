import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styles from "./Register.module.css";
import type { RegisterDto } from "../../types/auth.type";
import authService from "../../service/auth.service";

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatarUrl: "",
    },
    mode: "onTouched",
  });

  // Theo dõi giá trị password để so sánh với confirmPassword
  const passwordValue = useWatch({ name: "password", control });

  const onSubmit = async (data: RegisterFormData) => {
    const registerDto: RegisterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
    };
    try {
      console.log(registerDto);
      await authService.register(registerDto);
    } catch (error) {
      console.log("Error when register");
      console.log(error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        {/* Header */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registerForm}
          noValidate
        >
          {/* Name */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.inputLabel}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={`${styles.inputField} ${errors.name ? styles.inputError : ""}`}
              placeholder="John Doe"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          {/* Email (emai) */}
          <div className={styles.inputGroup}>
            <label htmlFor="emai" className={styles.inputLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="emai"
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

          {/* Image URL (Optional) */}
          <div className={styles.inputGroup}>
            <label htmlFor="imageUrl" className={styles.inputLabel}>
              Avatar URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              className={`${styles.inputField} ${errors.avatarUrl ? styles.inputError : ""}`}
              placeholder="https://example.com/avatar.jpg"
              {...register("avatarUrl", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
                  message: "Invalid URL format",
                },
              })}
            />
            {errors.avatarUrl && (
              <span className={styles.errorText}>
                {errors.avatarUrl.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`${styles.inputField} ${styles.passwordInput} ${errors.password ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  //   minLength: {
                  //     value: 6,
                  //     message: "Password must be at least 6 characters",
                  //   },
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
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

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.inputLabel}>
              Confirm Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`${styles.inputField} ${styles.passwordInput} ${errors.confirmPassword ? styles.inputError : ""}`}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className={styles.loginRedirect}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
