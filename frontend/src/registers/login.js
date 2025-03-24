import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";  // ✅ นำเข้า axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ ใช้สำหรับ Redirect

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  // ✅ ฟังก์ชัน Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      console.log("✅ Login Success:", response.data);

      if (response.data.CustomerID) {
        // ✅ เก็บ CustomerID ใน localStorage
        localStorage.setItem("customerId", response.data.CustomerID);
        alert("Login successful!");

        // ✅ ไปหน้า Home
        navigate("/Home");
      } else {
        console.error("❌ Error: No CustomerID received!");
        alert("Login failed: No CustomerID found.");
      }
    } catch (error) {
      console.error("❌ Login Failed:", error);
      setError("Login Failed! Please check your email/password.");
    }
  };
  




  return (
    <div className="form">
      <header className="logo-lg">
        <img className="logoimage" src="./Logo.png" alt="Logo" />
        <h1 className="logomessage">Welcome to WashAlytics</h1>
        <p>Please login using the form below</p>
      </header>

      <main className="main-lg">
        <form className="bs-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>} {/* แสดง error */}

          <label htmlFor="email" className="tx">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            className="input-bx long-input"
            placeholder="example: 12345@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="tx password">Password</label>
          <a className ='forgot' href="#">Forget password?</a><br />
          
          <div className="password-input-wrapper">
            <input
              type={passwordType}
              id="password"
              name="password"
              className="input-bx long-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="eye-icon">
              {isVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" stroke="#D9D9D9"/>
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" stroke="#D9D9D9"/>
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c-.335.48-.83 1.12-1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" stroke="#D9D9D9"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" stroke="#D9D9D9"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" stroke="#D9D9D9"/>
                </svg>
              )}
            </span>
          </div>

          <div className= "login">
            <button type="submit" className="bl-btn long-btn">Login</button>
          </div>
        </form>

        <div className="donthave">
          <p>Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;
