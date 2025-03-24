// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddMachine = () => {
//     const navigate = useNavigate();

//     // State เก็บค่าฟอร์ม
//     const [formData, setFormData] = useState({
//         machineID: "",
//         type: "Small Washer",
//         model: "",
//     });

//     // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าฟอร์ม
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // ฟังก์ชันกดปุ่ม "Cancel"
//     const handleCancel = () => {
//         navigate("/Home");
//     };

//     // ฟังก์ชันกดปุ่ม "Save"
//     const handleSave = async (e) => {
//         e.preventDefault(); // ป้องกันหน้าโหลดใหม่
//         try {
//             const response = await fetch("http://localhost:8000/api/machines/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert("Machine added successfully!");
//                 navigate("/Home"); // กลับไปหน้าหลัก
//             } else {
//                 alert("Failed to add machine");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Error adding machine");
//         }
//     };

//     return (
//         <div className="form-2">
//             <header>
//                 <div className="logo-lg">
//                     <img className="logoimage" src="./Logo.png" alt="Logo" />
//                     <h1 className="logomessage">Welcome to WashAlytics</h1>
//                     <p>Please Enter your machine Information</p>
//                 </div>
//             </header>

//             <main className="main-lg">
//                 <h2>Machine Information</h2>
//                 <form className="info-form" onSubmit={handleSave}>
//                     <label htmlFor="machineID" className="tx">Machine ID</label><br />
//                     <input 
//                         type="text" 
//                         id="machineID" 
//                         name="machineID" 
//                         className="input-bx long-input" 
//                         placeholder="Machine ID" 
//                         value={formData.machineID}
//                         onChange={handleChange}
//                     />

//                     <label htmlFor="type" className="tx password">Machine Type</label><br />
//                     <select 
//                         className="input-bx input-bx long-input selected" 
//                         name="type" 
//                         id="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                     >
//                         <option value="Small Washer">Small Washer</option>
//                         <option value="Medium Washer">Medium Washer</option>
//                         <option value="Large Washer">Large Washer</option>
//                         <option value="Dryer">Dryer</option>
//                         <option value="Coin">Coin</option>
//                     </select>

//                     <label htmlFor="model" className="tx password">Machine Model</label><br />
//                     <input 
//                         type="text" 
//                         id="model" 
//                         name="model" 
//                         className="input-bx long-input" 
//                         placeholder="Machine Model" 
//                         value={formData.model}
//                         onChange={handleChange}
//                     />

//                     <div className="save-cancle">
//                         <button onClick={handleCancel} type="button" className="blg-btn cancel">Cancel</button>
//                         <button type="submit" className="bl-btn save">Save</button>
//                     </div>
//                 </form>
//             </main>
//         </div>
//     );
// };

// export default AddMachine;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMachine = () => {
    const navigate = useNavigate();
    
    // State สำหรับเก็บค่าจากฟอร์ม
    const [machineData, setMachineData] = useState({
        name: "",
        machine_id: "",
        type: "Washer",  // ค่าเริ่มต้น: เครื่องซักผ้า
        times_used: 0,
        date_added: new Date().toISOString().split("T")[0]  // วันที่ปัจจุบัน
    });

    // อัปเดตค่าเมื่อผู้ใช้กรอกฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachineData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ฟังก์ชันบันทึกข้อมูล
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/machines/', machineData)            ;
            console.log("✅ Machine Added:", response.data);
            alert("🎉 เพิ่มเครื่องสำเร็จ!");
            navigate("/"); // กลับไปหน้า Home
        } catch (error) {
            console.error("❌ Error adding machine:", error);
            alert("⚠️ ไม่สามารถเพิ่มเครื่องได้ กรุณาลองอีกครั้ง!");
        }
    };

    return (
        <div className="container">
            <h2>🛠️ เพิ่มเครื่องซักผ้า/อบผ้า</h2>
            <form onSubmit={handleSubmit}>
                <label>ชื่อเครื่อง:</label>
                <input type="text" name="name" value={machineData.name} onChange={handleChange} required />

                <label>หมายเลขเครื่อง:</label>
                <input type="text" name="machine_id" value={machineData.machine_id} onChange={handleChange} required />

                <label>ประเภทเครื่อง:</label>
                <select name="type" value={machineData.type} onChange={handleChange}>
                    <option value="Washer">เครื่องซักผ้า</option>
                    <option value="Dryer">เครื่องอบผ้า</option>
                </select>

                <label>จำนวนครั้งที่ใช้:</label>
                <input type="number" name="times_used" value={machineData.times_used} onChange={handleChange} min="0" required />

                <label>วันที่เพิ่ม:</label>
                <input type="date" name="date_added" value={machineData.date_added} onChange={handleChange} required />

                <button type="submit">✅ บันทึก</button>
                <button type="button" onClick={() => navigate("/home")}>❌ ยกเลิก</button>
            </form>
        </div>
    );
};

export default AddMachine;
