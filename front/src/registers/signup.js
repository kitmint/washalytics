import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Import `Link` เพิ่มเข้าไป
import { signup } from "../services/api";  // ✅ Import API

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    

    const handleSignUp = async (event) => {
        event.preventDefault();
    
        // ✅ เช็คว่ารหัสผ่านกับยืนยันรหัสผ่านตรงกันไหม
        if (password !== confirmPassword) {
            setError("Passwords do not match!"); // ✅ แสดงข้อความผิดพลาด
            return; // ❌ ไม่ให้ส่งข้อมูลไปต่อ
        }
    
        try {
            const userData = { email, password };
            const responseData = await signup(userData);
    
            console.log("✅ Full Response Data:", responseData);  // ✅ Debug Log
    
            if (responseData?.CustomerID) {
                const customerId = responseData.CustomerID.toString();
                localStorage.setItem("customerId", customerId);
                console.log("✅ Saved CustomerID:", customerId);
    
                alert("Signup successful!");
                navigate("/LaundryInfo");
            } else {
                console.error("❌ Signup failed: No CustomerID found in response!", responseData);
                alert("Signup failed: No CustomerID found.");
            }
        } catch (error) {
            console.error("❌ Signup Error:", error);
            alert("Signup failed! Please try again.");
        }
    };
    
    
    
    

    

    return (
        <div className="form-0">
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please Sign Up using the form below</p>
                </div>
            </header>

            <main className="main-lg">
                <form className="bs-form" onSubmit={handleSignUp}>
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

                    <label htmlFor="password" className="tx password">Password</label><br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input-bx long-input" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="cf-password" className="tx password">Confirm Password</label><br />
                    <input 
                        type="password" 
                        id="cf-password" 
                        name="cf-password" 
                        className="input-bx long-input" 
                        placeholder="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="login">
                        <button type="submit" className="bl-btn long-btn">Sign Up</button>
                    </div>
                </form>

                <div className="donthave">
                    <p>Have an account? <Link to="/login" className="link">Login</Link></p>
                </div>
            </main>
        </div>
    );
};

export default Signup;


