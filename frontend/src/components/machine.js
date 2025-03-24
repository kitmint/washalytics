import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Machines = ({Machine, Profile}) => {
    const navigate = useNavigate();
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

    const MachineSmall = () => {
        const getStyleByTimes = (times) => {
            if (times < 50) {
                return { background: '#B8CF7E' };
            } else if (times >= 50 && times <= 100) {
                return { background: '#FFC96B' };
            } else {
                return { background: '#FF796D' };
            }
        };
    
        return (
            <div className='mac'>
                <h2>Small</h2>
                <div id="scrollx">
                    {Machine.filter(machine => machine.Type === 'Small Washer') // Filter for 'Small' type
                        .map((machine) => (
                            <Link 
                                className='machinebox' 
                                to={`/Machine/${machine.ID}`} 
                                key={machine.ID} 
                                style={getStyleByTimes(parseInt(machine.Times))}
                            >
                                <div>
                                    <img className='imgmachine' src="/Machine.png" alt="Machine" />
                                    <p className='model'>{machine.Model}</p>
                                    <p className='times'>Times: {machine.Times}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        );
    };

    const MachineMedium = () => {
        const getStyleByTimes = (times) => {
            if (times < 50) {
                return { background: '#B8CF7E' };
            } else if (times >= 50 && times <= 100) {
                return { background: '#FFC96B' };
            } else {
                return { background: '#FF796D' };
            }
        };
    
        return (
            <div className='mac'>
                <h2>Medium</h2>
                <div id="scrollx">
                {Machine.filter(machine => machine.Type === 'Medium Washer') // กรองเฉพาะ Type=small
                    .map((machine) => (
                        <Link 
                            className='machinebox' 
                            to={`/Machine/${machine.ID}`} 
                            key={machine.ID} 
                            style={getStyleByTimes(parseInt(machine.Times))}
                        >
                            <div>
                                <img className='imgmachine' src="./Machine.png"/>
                                <p className='model'>{machine.Model}</p>
                                <p className='times'>Times: {machine.Times}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    const MachineBig = () => {
        const getStyleByTimes = (times) => {
            if (times < 50) {
                return { background: '#B8CF7E' };
            } else if (times >= 50 && times <= 100) {
                return { background: '#FFC96B' };
            } else {
                return { background: '#FF796D' };
            }
        };
    
        return (
            <div className='mac'>
                <h2>Large</h2>
                <div id="scrollx">
                {Machine.filter(machine => machine.Type === 'Large Washer') // กรองเฉพาะ Type=small
                    .map((machine) => (
                        <Link 
                            className='machinebox' 
                            to={`/Machine/${machine.ID}`} 
                            key={machine.ID} 
                            style={getStyleByTimes(parseInt(machine.Times))}
                        >
                            <div>
                                <img className='imgmachine' src="./Machine.png"/>
                                <p className='model'>{machine.Model}</p>
                                <p className='times'>Times: {machine.Times}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    const MachineDryer = () => {
        const getStyleByTimes = (times) => {
            if (times < 50) {
                return { background: '#B8CF7E' };
            } else if (times >= 50 && times <= 100) {
                return { background: '#FFC96B' };
            } else {
                return { background: '#FF796D' };
            }
        };
    
        return (
            <div className='mac'>
                <h2>Dryer</h2>
                <div id="scrollx">
                {Machine.filter(machine => machine.Type === 'Dryer') // กรองเฉพาะ Type=small
                    .map((machine) => (
                        <Link 
                            className='machinebox' 
                            to={`/Machine/${machine.ID}`} 
                            key={machine.ID} 
                            style={getStyleByTimes(parseInt(machine.Times))}
                        >
                            <div>
                                <img className='imgmachine' src="./Machine.png"/>
                                <p className='model'>{machine.Model}</p>
                                <p className='times'>Times: {machine.Times}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };
    

    return (
        <div>
            <header className='header-3'>
                <div onClick={handleProfile} className="profile-content right">
                    <img className='profile' src={userData?.photo || "unknown.jpg"} alt="Profile" />
                </div>
                <h2 className='TxReview'>Machine</h2>
            </header>

            <main className='main-machine'>
                
                    {MachineSmall()}
                    {MachineMedium()}
                    {MachineBig()}
                    {MachineDryer()}
            </main>
            <footer>
            <Link to="/Home" className='svg-icon'>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 22V12H15.5V22M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Home</p>
            </Link>

            <Link to="/Analytics" className='svg-icon'>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 2L13.5 11.5L8.5 6.5L1 14M23 2H17M23 2V8" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Analytics</p>
            </Link>

            <Link to="/Machine" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_235_738)">
            <path d="M20.25 0.75H3.75C2.92157 0.75 2.25 1.42157 2.25 2.25V21.75C2.25 22.5784 2.92157 23.25 3.75 23.25H20.25C21.0784 23.25 21.75 22.5784 21.75 21.75V2.25C21.75 1.42157 21.0784 0.75 20.25 0.75Z" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.25 3.75H8.25" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 3.20001V4.20001" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3.20001V4.20001" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.25 6.75H21.75" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20.25C14.8995 20.25 17.25 17.8995 17.25 15C17.25 12.1005 14.8995 9.75 12 9.75C9.10051 9.75 6.75 12.1005 6.75 15C6.75 17.8995 9.10051 20.25 12 20.25Z" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.75 15C9.75 14.4033 9.98705 13.831 10.409 13.409C10.818 13 11.3683 12.7647 11.9451 12.7507" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_235_738">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            <p className='icon  active-icon'>Machine</p>
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

export default Machines;