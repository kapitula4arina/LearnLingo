import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../hooks/authValidation";
import { auth } from "../../services/api";
import css from "./AuthForm.module.css";
import EyeIcon from "../../assets/eye-off.svg";
import CloseIcon from "../../assets/close.svg";

const LoginModal = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
        style={{ width: 565, height: 505 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={css.close} onClick={onClose} aria-label="Close">
          <img src={CloseIcon} alt="Close" width={32} height={32} />
        </button>

        <h2 className={css.title}>Log In</h2>
        <p className={css.subtitle}>
          Welcome back! Please enter your credentials to access your account.
        </p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={css.inputsWrapper}>
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

          <button
            type="submit"
            className={`${css.submit}`}
            disabled={isSubmitting}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
