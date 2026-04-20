import { useState } from "react";
import { resetPassword } from "../api/auth";
import api from "../api/axios";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.css";
import { set } from "react-hook-form";

export default function ForgotPassword({ switchToLogin }) {
  const [step, setStep] = useState("verify"); // verify, reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailVerify = async () => {    
    
    try {
      setErrors({});
      setLoading(true);
      await api.post("/verify-email", { email });
      setStep("reset");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
        setTimeout(() => setErrors({}), 5000); // clear errors after 5 seconds
      } else {
        toast.error(err.response?.data?.message || "Email not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async () => {
    try {
      setErrors({});
      if (password !== passwordConfirm) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      await resetPassword({ email, password, password_confirmation: passwordConfirm });
      toast.success("Password reset successfully");
      switchToLogin();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        toast.error(err.response?.data?.message || "Error resetting password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {step === "verify" ? (
          <>
            <input
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}

            <button
              className="btn mt-4 w-full"
              onClick={handleEmailVerify}
              disabled={loading}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">Email: <strong>{email}</strong></p>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full pr-10"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}

            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input w-full pr-10"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation[0]}
              </p>
            )}

            <button
              className="btn mt-4 w-full"
              onClick={handleResetSubmit}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              className="text-sm text-gray-600 mt-2 w-full"
              onClick={() => {
                setStep("verify");
                setPassword("");
                setPasswordConfirm("");
              }}
            >
              ← Back
            </button>
          </>
        )}

        <p className="text-sm mt-3 text-center">
          Remember your password?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

