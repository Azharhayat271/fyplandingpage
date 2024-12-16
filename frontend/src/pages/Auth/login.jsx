import React, { useState } from "react";
import Img1 from "./../../assets/images/auth/auth/auth-img.png"; // Update this image path as needed
import Img2 from "./../../assets/images/fypImages/newlogored.png"; // Logo image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "./../../API/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertVisible(false); // Reset alert visibility on form submit

    // Basic validation
    if (!email || !password) {
      setError("Email and password cannot be empty.");
      setSuccessMessage(null);
      setLoading(false);
      setAlertVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage(null);
      setLoading(false);
      setAlertVisible(true);
      return;
    }

    try {
      const response = await LoginAPI({ email, password });
      if (response.error) {
        setError(response.error);
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("image", response.data.user.image);
        navigate("/newDashboardDesign");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
      setAlertVisible(true); // Show alert after submitting
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <section className="auth bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src={Img1} alt="" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div className="text-center mb-4">
              <h4 className="mb-2">Sign In</h4>
              <p className="mb-3 text-secondary-light text-lg">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Bootstrap Alert for error or success messages */}
            {alertVisible && (
              <div
                className={`alert ${error ? "alert-danger" : "alert-success"}`}
                role="alert"
              >
                {error || successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 me-2"
                  onClick={handlePasswordToggle}
                >
                  {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> */}
                </button>
              </div>
              <button
                type="submit"
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="mt-32 text-center text-sm">
                <p className="mb-0">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-primary-600 fw-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="text-center mt-2">
                <Link
                  to="/forget-password"
                  className="text-primary-600 fw-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
