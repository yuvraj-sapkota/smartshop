import { useState } from "react";
import AuthForm from "../AuthForm";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);

      console.log(form);

      // API CALL HERE
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Login to continue"
      fields={loginFields}
      form={form}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      buttonText="Login"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLink="/signup"
      showRememberMe={true}
      showForgotPassword={true}
      isLoading={isLoading}
    />
  );
};

export default Login;
