import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LaundryInfo = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const savedEmail = localStorage.getItem("userEmail");
                if (!savedEmail) return;

                const response = await fetch(`http://localhost:8000/api/user-info/?email=${savedEmail}`);
                const data = await response.json();

                if (response.ok) {
                    setEmail(data.email);
                } else {
                    console.error("Error fetching user:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleCancel = () => {
        navigate("/add_branch");
    };

    const handleSave = async (e) => {
    e.preventDefault(); // ป้องกันการ refresh หน้า

    const laundryData = {
        laundryname: document.getElementById("laundryname").value,
        rgtnumber: document.getElementById("rgtnumber").value,
        address: document.getElementById("Address").value,
        ownername: document.getElementById("ownername").value,
        telephone: document.getElementById("tel").value,
        email: email, // ใช้ email ที่โหลดมาจาก localStorage
    };

    try {
        const response = await fetch("http://localhost:8000/api/user-info/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(laundryData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Saved successfully:", result);
            alert("ข้อมูลถูกบันทึกแล้ว!");
            navigate("/Home"); // กลับไปหน้า Home
        } else {
            console.error("❌ Error saving data:", result.error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล!");
        }
    } catch (error) {
        console.error("❌ Failed to save data:", error);
        alert("เซิร์ฟเวอร์ไม่ตอบสนอง!");
    }
};

    return (
        <div className="form-1">
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please Enter your laundry Information</p>
                </div>
            </header>

            <main className="main-lg">
                <h2>Laundry Information</h2>
                <form className="info-form">
                    <label htmlFor="laundryname" className="tx">Laundry Name</label><br />
                    <input type="text" id="laundryname" name="laundryname" className="input-bx long-input" placeholder="Laundry Name" />

                    <label htmlFor="rgtnumber" className="tx password">Registration Number</label><br />
                    <input type="text" id="rgtnumber" name="rgtnumber" className="input-bx long-input" placeholder="Registration Number" />

                    <label htmlFor="Address" className="tx password">Address</label><br />
                    <input type="text" id="Address" name="Address" className="input-bx long-input" placeholder="Address" />

                    <label htmlFor="ownername" className="tx password">Owner Name</label><br />
                    <input type="text" id="ownername" name="ownername" className="input-bx long-input" placeholder="Owner Name" />

                    <label htmlFor="tel" className="tx password">Telephone</label><br />
                    <input type="tel" id="tel" name="tel" className="input-bx long-input" placeholder="ex: 082-345-67xx" />

                    <label htmlFor="email" className="tx password">Email</label><br />
                    <input type="email" id="email" name="email" className="input-bx long-input" placeholder="ex: 12345@gmail.com" value={email} readOnly />

                    <div className='save-cancel'>
                        <button onClick={handleCancel} type="button" className="blg-btn cancel">Cancel</button>
                        <button onClick={handleSave} type="submit" className="bl-btn save">Save</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default LaundryInfo;
