import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../hooks/authValidation";
import { auth } from "../../services/api";
import css from "./AuthForm.module.css";
import EyeIcon from "../../assets/eye-off.svg";
import CloseIcon from "../../assets/close.svg";

const RegisterModal = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        style={{ width: 566, height: 599 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={css.close} onClick={onClose} aria-label="Close">
          <img src={CloseIcon} alt="Close" width={32} height={32} />
        </button>

        <h2 className={css.title}>Registration</h2>
        <p className={css.subtitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={css.inputsWrapper}>
            <div className={css.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={css.input}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={css.input}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.inputGroup}>
              <div className={css.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={css.input}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  className={css.toggle}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src={EyeIcon}
                    alt="Toggle"
                    width={20}
                    height={20}
                    className={showPassword ? css.toggled : ""}
                  />
                </button>
              </div>
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className={css.submit} disabled={isSubmitting}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
