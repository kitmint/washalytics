// 📌 frontend/src/services/api.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        return data;  // ✅ ส่งข้อมูลกลับไปให้ React ใช้
    } catch (error) {
        console.error("❌ Login Error:", error);
        throw error;
    }
}


export const signup = async (userData) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/signup/", userData, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("✅ Signup Response:", response);  // ✅ Debug Log
        console.log("✅ Response Data:", response.data);  // ✅ ดูว่ามี CustomerID จริงไหม

        return response.data;  // ✅ ต้อง return ค่า response.data
    } catch (error) {
        console.error("❌ Signup Failed:", error);
        throw new Error("Signup failed!");
    }
};


const API_URL = "http://127.0.0.1:8000/api/machines/";

export const getMachinesByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}?customer_id=${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const addMachine = async (machineData) => {
  try {
    const response = await axios.post(API_URL, machineData);
    return response.data;
  } catch (error) {
    console.error("Error adding machine:", error);
    throw error;
  }
};