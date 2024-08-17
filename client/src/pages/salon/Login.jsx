import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import loginImage from "../../assets/Login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null); // For storing reCAPTCHA token
  const navigate = useNavigate();

  // Replace with your reCAPTCHA site key
  const recaptchaSiteKey = "6LfZsSgqAAAAADILAqP30cd6uPX9lZezvJIVdeQp";

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token); // Store the reCAPTCHA token when verified
  };

  const handleLogin = async () => {
    if (email.trim() !== "" && password.trim() !== "" && recaptchaToken) {
      const userCredentials = {
        email: email,
        password: password,
        recaptchaToken: recaptchaToken, // Send the reCAPTCHA token to the server
      };

      try {
        const response = await fetch("http://localhost:5050/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        });

        if (response.ok) {
          const data = await response.json();
          const { token, licenseNumber } = data;

          console.log(data); // Log the data to see if licenseNumber is being received

          // Save the token and licenseNumber to localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("licenseNumber", licenseNumber);

          alert("Login successful!");
          navigate("/addproducts"); // Redirect on success
        } else {
          throw new Error("Invalid email, password, or CAPTCHA verification failed");
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed: " + error.message);
      }
    } else {
      alert("Please enter all fields and complete the CAPTCHA");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Half - Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-3/4 h-3/4 object-cover"
        />
      </div>
      {/* Right Half - Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
          <h2 className="text-sm mb-4">Please log in to access your account</h2>
          <div className="flex items-center w-full mb-4">
            <hr className="flex-1 border-gray-400" />
            <span className="mx-4 text-gray-400">Or</span>
            <hr className="flex-1 border-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Password"
          />
          {/* reCAPTCHA */}
          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            onChange={handleRecaptchaChange}
            className="mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-teal-500 text-white px-4 py-2 rounded-md w-full hover:bg-teal-700 hover:text-white"
          >
            Login
          </button>
          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-green-800">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
