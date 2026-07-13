import { useState } from "react";
import AuthForm from "../AuthForm";
import LocationAddressField from "../LocationAddressField";
import { registerSellerApi } from "../../services/auth/auth.api";
import { showError, showSuccess } from "../../utils/toast";

const SellerSignup = () => {
  const [form, setForm] = useState({
    referBy: "",
    username: "",
    email: "",
    password: "",
    storeName: "",
    storeAddress: "",
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [manualMode, setManualMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLocationChange = (coords) => {
    setForm((prev) => ({
      ...prev,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
    }));
    setErrors((prev) => ({ ...prev, storeAddress: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!form.storeName.trim()) newErrors.storeName = "Store name is required";

    const hasLocation = form.latitude != null && form.longitude != null;
    if (!hasLocation && !form.storeAddress.trim()) {
      newErrors.storeAddress =
        "Share your store's location or enter its address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const data = await registerSellerApi(form);
      showSuccess(data.message);

      setForm({
        referBy: "",
        username: "",
        email: "",
        password: "",
        storeName: "",
        storeAddress: "",
        latitude: null,
        longitude: null,
      });

      setLocationStatus("idle");
      setManualMode(false);
    } catch (error) {
      showError(error.response?.data?.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const signupFields = [
    {
      label: "Referral Username",
      name: "referBy",
      type: "text",
      placeholder: "Referral code if any",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter username",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Create password",
    },
    {
      label: "Store Name",
      name: "storeName",
      type: "text",
      placeholder: "Enter storeName",
    },
  ];

  return (
    <AuthForm
      title="Create Seller Account"
      subtitle="Create your seller account to continue"
      fields={signupFields}
      form={form}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      buttonText="Create Account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLink="/login"
      isLoading={isLoading}
    >
      <LocationAddressField
        label="Store Address"
        name="storeAddress"
        value={form.storeAddress}
        onChange={handleChange}
        onLocationChange={handleLocationChange}
        error={errors.storeAddress}
        placeholder="Enter your store address"
        locationStatus={locationStatus}
        setLocationStatus={setLocationStatus}
        manualMode={manualMode}
        setManualMode={setManualMode}
      />
    </AuthForm>
  );
};

export default SellerSignup;
