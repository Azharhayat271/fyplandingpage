import React, { useState } from "react";
import { motion } from "framer-motion";
import Img1 from "./../../assets/images/auth/auth/auth-img.png"; // Update this image path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "./../../API/auth/register"; // Ensure this path is correct

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      setLoading(false);
      return;
    }

    try {
      const response = await LoginAPI({
        name,
        username,
        gender,
        email,
        password,
        phoneNo,
      });
      if (response.error) {
        setError(response.error);
      } else {
        setShowModal(true); // Show modal on successful registration
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Redirect after closing the modal
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
              <h4 className="mb-2">Sign Up</h4>
              <p className="mb-3 text-secondary-light text-lg">
                Welcome! Please enter your details
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <select
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Phone Number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
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
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex align-items-center mb-16">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                <label className="form-check-label">
                  I agree to the terms and conditions
                </label>
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
                  "Sign Up"
                )}
              </button>

              <div className="mt-32 text-center text-sm">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary-600 fw-semibold">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {showModal && (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="modal-content"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
    >
      <h5>User Registered</h5>
      <p>User registered successfully! Kindly check your mail to verify the account.</p>
      <button onClick={handleCloseModal} className="btn btn-primary btn-sm">Close</button>
    </motion.div>
  </motion.div>
)}

    </div>
  );
};

export default Signup;
