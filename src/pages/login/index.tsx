import React, { useState, useCallback, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { validateForm } from "../../utils/validation";
import type { AuthFormField } from "../../components/AuthForm/authForm.interface";
import { loginUser } from "../../service/auth.service";
import { useSelector, useDispatch } from "../../store/index";
import { useToast } from "../../hooks/useToast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) {
      showSuccess("Login successful!");
      navigate("/");
    }
  }, [isAuthenticated, navigate, showSuccess]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (errors.email) {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    },
    [errors.email]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    },
    [errors.password]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const formErrors = validateForm({ email, password });
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return;
      }

      dispatch(loginUser({ email, password }));
    },
    [dispatch, email, password]
  );

  const handleSignupClick = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  const fields: AuthFormField[] = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: email,
      onChange: handleEmailChange,
      required: true,
      error: errors.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: handlePasswordChange,
      required: true,
      error: errors.password,
    },
  ];

  return (
    <AuthForm
      title="Sign In"
      subtitle="Welcome back! Please sign in to your account."
      fields={fields}
      submitText="Sign In"
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      onFooterLinkClick={handleSignupClick}
      isLoading={loading}
    />
  );
};

Login.displayName = "Login";

export default memo(Login);
