// // Login.jsx
// import React, { useState, useEffect } from 'react';
// import './Login.css';

// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
  
// const BASE_URL = process.env.REACT_APP_BASE_URL;

//   // useEffect(() => {
//   //   if (jwt && user) {
//   //     if (user.role === "ADMIN") navigate("/admin-dashboard");
//   //     else if (user.designation === "Receptionist") navigate("/receptionist-dashboard");
//   //     else if (user.role === "DOCTOR") navigate("/doctor-dashboard");
//   //     else if (user.designation === "Head Nurse") navigate("/nurse-dashboard");
//   //     else if (user.designation === "Inventory Manager") navigate("/inventoryManager-dashboard");
//   //     else toast.error("Unknown role, cannot navigate", { position: "top-center", autoClose: 4000 });
//   //   }
//   // }, [jwt, user, navigate]);

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(`${BASE_URL}/api/auth/login`, {
//       email,
//       password,
//     });

//     const { token, user, staff } = response.data;

//     // Save token and user in localStorage
//     localStorage.setItem("jwt", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("staff", JSON.stringify(staff));
//     console.log("Stored User:", JSON.parse(localStorage.getItem("user")))
//     // Navigate based on role/designation
//     if (user.role === "ADMIN") navigate("/admin-dashboard");
//     else if (user.designation === "Receptionist") navigate("/receptionist-dashboard");
//     else if (user.role === "DOCTOR") navigate("/doctor-dashboard");
//     else if (user.designation === "Metron") navigate("/nurse-dashboard");
//     else if (user.designation === "O.T. Attendant") navigate("/nurse-dashboard");
//      else if (user.designation === "Pathologist") navigate("/lab-dashboard")
//     else if (user.role === "PATIENT") navigate("/patient-dashboard")
//     else if (user.designation === "Pharmacists") navigate("/inventoryManager-dashboard");
//   else if (user.designation === "Sonography Assist") navigate("/sonography-dashboard");
//     // else if (user.designation === "Sonography Assist") navigate("/sonography-dashboard");
//     else toast.error("Unknown role, cannot navigate", { position: "top-center", autoClose: 4000 });

//   } catch (err) {
//     console.error("Login error:", err.response?.data || err.message);
//     toast.error(err.response?.data?.message || "Invalid email or password");
//     navigate("/somewhere");
//   }
// };


//   return (
//     <div className="hospital-login-container">
//       <ToastContainer />
//   <div className="hospital-left">
//   <div className="logo-container">
//     <img src="/images/logo2.png" alt="Care Cure Logo" className="hospital-logo" />
//     <span className="logo-text">CareCure Hospital</span> {/* ⬅️ Hospital name */}
//   </div>

//   {/* 🔁 Restore this blur overlay */}
//   <div className="overlay-text"></div>

//   <div className="left-heading">
//     <h1>Centers of</h1>
//     <h3 className="excellence-text">
//       E<span className="black-x">x</span>cellence
//     </h3>
//     <p>
//       Empowering Healthcare, Saving Lives.
//       Your Health, Our Mission.
//       Dedicated to Patient-Centered Excellence.
//     </p>
//   </div>
// </div>



//       <div className="hospital-right">
//         <form onSubmit={handleSubmit}>
//           <div className="welcome-section">
//             <FaLock className="lock-icon" />
//             <h2>Welcome</h2>
//           </div>
//           <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
         
//           <button className='button' type="submit">Login</button>
//           <div
//   style={{
//     marginTop: "20px",
//     textAlign: "center"
//   }}
// >

//   <p>

//     New Patient?

//     <Link
//       to="/patient-register"
//       style={{
//         marginLeft: "5px",
//         color: "blue",
//         fontWeight: "bold"
//       }}
//     >
//       Register Here
//     </Link>

//   </p>

// </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, user, staff } = response.data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("staff", JSON.stringify(staff));

      toast.success("Login Successful");

      if (user.role === "ADMIN")
        navigate("/admin-dashboard");
      else if (user.designation === "Receptionist")
        navigate("/receptionist-dashboard");
      else if (user.role === "DOCTOR")
        navigate("/doctor-dashboard");
      else if (
        user.designation === "Metron" ||
        user.designation === "O.T. Attendant"
      )
        navigate("/nurse-dashboard");
      else if (user.designation === "Pathologist")
        navigate("/lab-dashboard");
      else if (user.role === "PATIENT")
        navigate("/patient-dashboard");
      else if (user.designation === "Pharmacists")
        navigate("/inventoryManager-dashboard");
      else if (user.designation === "Sonography Assist")
        navigate("/sonography-dashboard");

      else if (user.designation === "Radiology")
  navigate("/radiology-dashboard");

      
      else {
        toast.error("Unknown Role");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };


  const handleDesignationClick = (role) => {
  switch (role) {
    case "Doctor":
      setEmail("doctor@gmail.com");
      setPassword("123456");
      break;

    case "Patient":
      setEmail("patient@gmail.com");
      setPassword("123456");
      break;

    case "Nurse":
      setEmail("nurse@gmail.com");
      setPassword("123456");
      break;

    case "Lab":
      setEmail("lab@gmail.com");
      setPassword("123456");
      break;

    case "Pharmacy":
      setEmail("pharmacy@gmail.com");
      setPassword("123456");
      break;

    case "Reception":
      setEmail("reception@gmail.com");
      setPassword("123456");
      break;

    default:
      break;
  }
};

  return (
    <div className="login-page">
      <ToastContainer />

      <div className="overlay"></div>

      {/* Logo */}
      {/* <div className="top-logo">
        <img
          src="/images/logo2.png"
          alt="logo"
        />
        <h2>CareCure Hospital</h2>
      </div> */}

      {/* Welcome */}
      <div className="welcome-text">
        <h1>Welcome to CareCure Hospital</h1>
        <p>Dedicated to Your Health</p>
      </div>

      {/* Quote */}
      <div className="quote-box">
        <h2>
          YOUR DEDICATION TODAY
          <br />
          BRINGS HEALTH AND HOPE
          <br />
          TO TOMORROW.
        </h2>

        <p>
          Every life you touch makes a
          difference.
        </p>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="login-heading">
            <FaLock className="lock-icon" />
            <h2>Login</h2>
          </div>

          <input
            type="email"
            placeholder="Email or Staff ID"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <div className="password-wrapper">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <span
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>


{/* Designation Cards */}<div className="designation-grid">

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Doctor")}
  >
    <span>👨‍⚕️</span>
    <p>Doctor</p>
  </div>

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Patient")}
  >
    <span>🛏️</span>
    <p>Patient</p>
  </div>

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Nurse")}
  >
    <span>👩‍⚕️</span>
    <p>Nurse</p>
  </div>

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Lab")}
  >
    <span>🧪</span>
    <p>Lab</p>
  </div>

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Pharmacy")}
  >
    <span>💊</span>
    <p>Pharmacy</p>
  </div>

  <div
    className="designation-card"
    onClick={() => handleDesignationClick("Reception")}
  >
    <span>📋</span>
    <p>Reception</p>
  </div>

</div>

          {/* Bottom Links */}
          <div className="bottom-links">

            <Link
              to="/patient-register"
              className="register-link"
            >
              Register Patient
            </Link>

            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>

          </div>
        </form>
      </div>

      <div className="footer-links">
        Terms & Conditions | Privacy Policy
      </div>
    </div>
  );
};

export default Login;