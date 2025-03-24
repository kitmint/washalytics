import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

// RevenueShow Component
const RevenueShow = ({ Income }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('January 2025');

  // Filter based on the selected period
  const filteredFinance = (Income || []).filter(income =>
    selectedPeriod === "January 2025" ? income.Day?.includes("01-2025") :
    selectedPeriod === "February 2025" ? income.Day?.includes("02-2025") : true
  );
  

  const FinanceElements = filteredFinance.map((income, index) => (
    <div className='hrbottom' key={index}>
      <h2 className='incometype'>{income.Type}</h2>
      <p className='daydate'>{income.Day} {income.Date}</p>
      <p className='income-type' style={{ color: income.Type === "Income" ? '#B8CF7E' : '#FF796D' }}>
        {income.Type === "Income" ? '+' : '-'} {income.Money} <span className='THB'>THB</span>
      </p>
    </div>
  ));

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
        <nav className='two-input'>
            <select
                className="input-bx"
                name="Type"
                id="Type"
            >
                <option value="Total">Total revenue</option>
                <option value="Monthly">Monthly revenue</option>
                <option value="Dialy">Dialy revenue</option>
            </select>
            
            <select
                className="input-bx"
                name="Type"
                id="Type"
            >
                <option value="Today">Today</option>
                <option value="7days">7 Days</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>
        </nav>

        <div className='Revenue'>
            <div className='RevenueChart'>
            <iframe 
              title="final_income" 
              width="340" 
              height="340" 
              src="https://app.powerbi.com/view?r=eyJrIjoiZDEwOWVjZDQtYThlMS00ZDM5LWI5ZGUtZjg0NGJkZDNjYWVmIiwidCI6ImZkMjA2NzE1LTc1MDktNGFlNS05Yjk2LTc2YmI5Nzg4NmE4NCIsImMiOjEwfQ%3D%3D" 
              frameborder="0" 
              allowFullScreen="true"></iframe>
            </div>
        <h3>Recent Revenue</h3>
        <select
            className="input-bx long-input Month"
            name="Type"
            id="Type"
            value={selectedPeriod}
            onChange={handlePeriodChange}
        >
            <option value="January 2025">Period: January 2025</option>
            <option value="February 2025">Period: February 2025</option>
        </select>

        <div id='scrolly' className='financeelement'>
            {FinanceElements}
        </div>
        </div>
    </div>
  );
};

// UsingShow Component
const getTotalTimesByType = (Machine) => {
  return Machine.reduce((acc, machine) => {
    if (!acc[machine.Type]) {
      acc[machine.Type] = 0;
    }
    acc[machine.Type] += machine.Times;
    return acc;
  }, {});
};

const UsingShow = ({ Machine }) => {
    const [selectedType, setSelectedType] = useState("All");
    const [selectedTimePeriod, setSelectedTimePeriod] = useState("Today");
  
    const totalTimesByType = getTotalTimesByType(Machine);
  
    // ฟังก์ชันกรอง Machine ตามประเภทที่เลือก
    const filteredMachine = Machine.filter((machine) => {
      if (selectedType === "All") return true; // แสดงทั้งหมด
      if (selectedType === "Washing" && (machine.Type.includes("Washer"))) return true; // แสดงเฉพาะเครื่องซักผ้า
      if (selectedType === "Dryer" && machine.Type === "Dryer") return true; // แสดงเฉพาะเครื่องอบผ้า
      return false;
    });
  
    const filteredTotalTimes = getTotalTimesByType(filteredMachine);

    const getTimePeriodMessage = (period) => {
        switch (period) {
          case "Today":
            return <h3>Using Today</h3>;
          case "7days":
            return <h3>Using Last 7 days</h3>;
          case "Monthly":
            return <h3>Using Monthly</h3>;
          case "Yearly":
            return <h3>Using Yearly</h3>;
          default:
            return null;
        }
      };
  
    return (
      <div>
        <nav className='two-input'>
          <select
            className="input-bx"
            name="Type"
            id="Type"
            onChange={(e) => setSelectedType(e.target.value)} // เปลี่ยนประเภทที่เลือก
          >
            <option value="All">All Machine</option>
            <option value="Washing">Washing Machine</option>
            <option value="Dryer">Dryer</option>
          </select>
  
          <select
            className="input-bx"
            name="TimePeriod"
            id="TimePeriod"
            onChange={(e) => setSelectedTimePeriod(e.target.value)} // เปลี่ยนช่วงเวลา
          >
            <option value="Today">Today</option>
            <option value="7days">7 Days</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </nav>
  
        <div className='RevenueChart'>
        <iframe 
          title="final_usage" 
          width="340" 
          height="340" 
          src="https://app.powerbi.com/view?r=eyJrIjoiMTlkMzllMDEtNWFjNy00ZDk4LTgzN2YtMTYzOTkzMjY5YjJjIiwidCI6ImZkMjA2NzE1LTc1MDktNGFlNS05Yjk2LTc2YmI5Nzg4NmE4NCIsImMiOjEwfQ%3D%3D" 
          frameborder="0" 
          allowFullScreen="true"></iframe>
        </div>

        {getTimePeriodMessage(selectedTimePeriod)}
  
        <div className='table'>
          <div className='title-table'>
            <p className='title-p'>Machine</p>
            <p className='count-p'>Count</p>
          </div>
  
          <div>
            {/* ซ่อนหรือแสดง Small Washer ขึ้นอยู่กับประเภทที่เลือก */}
            {selectedType === "All" || selectedType === "Washing" ? (
              <div className='column'>
                <p className='title-p'>Small Washer</p>
                <p className='count-p'>{filteredTotalTimes["Small Washer"] || 0}</p>
              </div>
            ) : null}
  
            {/* ซ่อนหรือแสดง Medium Washer ขึ้นอยู่กับประเภทที่เลือก */}
            {selectedType === "All" || selectedType === "Washing" ? (
              <div className='column'>
                <p className='title-p'>Medium Washer</p>
                <p className='count-p'>{filteredTotalTimes["Medium Washer"] || 0}</p>
              </div>
            ) : null}
  
            {/* ซ่อนหรือแสดง Large Washer ขึ้นอยู่กับประเภทที่เลือก */}
            {selectedType === "All" || selectedType === "Washing" ? (
              <div className='column'>
                <p className='title-p'>Large Washer</p>
                <p className='count-p'>{filteredTotalTimes["Large Washer"] || 0}</p>
              </div>
            ) : null}
  
            {/* ซ่อนหรือแสดง Dryer ขึ้นอยู่กับประเภทที่เลือก */}
            {selectedType === "All" || selectedType === "Dryer" ? (
              <div className='column'> 
                <p className='title-p'>Dryer</p>
                <p className='count-p'>{filteredTotalTimes["Dryer"] || 0}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

// PerformanceShow Component
const PerformanceShow = ({ Machine }) => {
    const [selectedType, setSelectedType] = useState("All");
  
    const categorizeMachines = (machines) => {
      const result = {
        Good: 0,
        Moderate: 0,
        NeedToPrepare: 0,
      };
  
      machines.forEach(machine => {
        const times = parseInt(machine.Times);
  
        if (times < 50) {
          result.Good += 1;
        } else if (times >= 50 && times < 100) {
          result.Moderate += 1;
        } else if (times >= 100) {
          result.NeedToPrepare += 1;
        }
      });
  
      return result;
    };
  
    // ฟังก์ชันกรองตามประเภทเครื่องจักรที่เลือก
    const filteredMachines = Machine.filter((machine) => {
      if (selectedType === "All") return true; // ถ้าเลือก All ให้แสดงเครื่องทั้งหมด
      if (selectedType === "Small" && machine.Type === "Small Washer") return true;
      if (selectedType === "Medium" && machine.Type === "Medium Washer") return true;
      if (selectedType === "Large" && machine.Type === "Large Washer") return true;
      if (selectedType === "Dryer" && machine.Type === "Dryer") return true;
      return false;
    });
  
    const result = categorizeMachines(filteredMachines);
  
    return (
      <div>
          <nav className='two-input'>
              <select
                  className="input-bx"
                  name="Type"
                  id="Type"
                  onChange={(e) => setSelectedType(e.target.value)} // เปลี่ยนประเภทที่เลือก
              >
                  <option value="All">All Machine</option>
                  <option value="Small">Small Washing</option>
                  <option value="Medium">Medium Washing</option>
                  <option value="Large">Large Washing</option>
                  <option value="Dryer">Dryer</option>
              </select>
              
              <select
                  className="input-bx"
                  name="Type"
                  id="TimePeriod"
              >
                  <option value="Today">Today</option>
                  <option value="7days">7 Days</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
              </select>
          </nav>

        <div className='RevenueChart'>
        <iframe 
          title="final_status" 
          width="340" 
          height="340" 
          src="https://app.powerbi.com/view?r=eyJrIjoiNTE2Zjg1ZWMtZTEwMy00MzhhLTk3YTctODQxMDIwNDJiMDU0IiwidCI6ImZkMjA2NzE1LTc1MDktNGFlNS05Yjk2LTc2YmI5Nzg4NmE4NCIsImMiOjEwfQ%3D%3D" 
          frameborder="0" 
          allowFullScreen="true"></iframe>
        </div>

        <h3>All Machine Performance</h3>

        <div className='table'>
            <div className='title-table'>
                <p className='title-p'>Machine</p>
                <p className='count-p'>Count</p>
            </div>

            <div>
                <div className='column'>
                <p className='title-p'>Good</p>
                <p className='count-p'>{result.Good}</p>
                </div>
                <div className='column'>
                <p className='title-p'>Moderate</p>
                <p className='count-p'>{result.Moderate}</p>
                </div>
                <div className='column'>
                <p className='title-p'>NeedToPrepare</p>
                <p className='count-p'>{result.NeedToPrepare}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

// Analytics Component
const Analytics = ({ Income, Profile, Machine }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('revenue'); // 'revenue', 'using', 'performance'
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);


    useEffect(() => {
        const customerId = localStorage.getItem("customerId");

        if (!customerId) {
            console.error("❌ No CustomerID found! Redirecting to login...");
            navigate("/login");
            return;
        }

        console.log("📡 Fetching Home Data for CustomerID:", customerId);

        axios.get(`http://localhost:8000/api/home/${customerId}/`)
            .then(response => {
                console.log("✅ Home Data Received:", response.data);
                setUserData(response.data);
            })
            .catch(error => {
                console.error("❌ Error fetching user data:", error);
            });
    }, [navigate]);
  

  const handleProfile = () => {
      let customerId = Profile?.CustomerID;

      if (!customerId) {
          console.warn("⚠️ Profile.CustomerID not found! Trying localStorage...");
          customerId = localStorage.getItem("customerId");
      }

      customerId = String(customerId).trim();

      if (!customerId || customerId === "undefined" || customerId === "null") {
          console.error("❌ No valid CustomerID found!");
          alert("Error: Please login first!");
          navigate("/login");
          return;
      }

      console.log("✅ Navigating to Profile with ID:", customerId);
      navigate(`/profile/${customerId}`);
  };

  return (
    <div>
      <header className='header-2'>
        <div onClick={handleProfile} className="profile-content right">
          <img className='profile' src={userData?.photo || "unknown.jpg"} alt="Profile" />
        </div>
        <h2 className='TxReview'>Analytics</h2>

        <div id="scrollx" className='ana-scroll'>
        <button 
    className={`ana-btn ${activeView === 'revenue' ? 'active' : ''}`} 
    onClick={() => setActiveView('revenue')}
  >
    Revenue
  </button>
  <button 
    className={`ana-btn ${activeView === 'using' ? 'active' : ''}`} 
    onClick={() => setActiveView('using')}
  >
    Machine Using
  </button>
  <button 
    className={`ana-btn ${activeView === 'performance' ? 'active' : ''}`} 
    onClick={() => setActiveView('performance')}
  >
    Machine Performance
  </button>
        </div>
      </header>

      <main className='main-ana'>
        {activeView === 'revenue' && <RevenueShow Income={Income} />}
        {activeView === 'using' && <UsingShow Machine={Machine} />}
        {activeView === 'performance' && <PerformanceShow Machine={Machine} />}
      </main>

            <footer>
            <Link to="/Home" className='svg-icon'>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 22V12H15.5V22M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Home</p>
            </Link>

            <Link to="/Analytics" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_584_563)">
            <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_584_563">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            <p className='icon  active-icon'>Analytics</p>
            </Link>

            <Link to="/Machine" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_235_706)">
                <path d="M20.25 0.75H3.75C2.92157 0.75 2.25 1.42157 2.25 2.25V21.75C2.25 22.5784 2.92157 23.25 3.75 23.25H20.25C21.0784 23.25 21.75 22.5784 21.75 21.75V2.25C21.75 1.42157 21.0784 0.75 20.25 0.75Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.25 3.75H8.25" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 3.20001V4.20001" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.20001V4.20001" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.25 6.75H21.75" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20.25C14.8995 20.25 17.25 17.8995 17.25 15C17.25 12.1005 14.8995 9.75 12 9.75C9.10051 9.75 6.75 12.1005 6.75 15C6.75 17.8995 9.10051 20.25 12 20.25Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.75 15C9.75 14.4033 9.98705 13.831 10.409 13.409C10.818 13 11.3683 12.7647 11.9451 12.7507" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_235_706">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <p className='icon'>Machine</p>
            </Link>

            <Link to="/Accounting" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_422_231)">
                <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_422_231">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <p className='icon'>Accounting</p>
            </Link>
            <Link to="/Review" className='svg-icon'>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 2L14.59 8.26L21.5 9.27L16.5 14.14L17.68 21.02L11.5 17.77L5.32 21.02L6.5 14.14L1.5 9.27L8.41 8.26L11.5 2Z" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


            <p className='icon'>Review</p>
            </Link>
            </footer>
        </div>
    )
}

export default Analytics;