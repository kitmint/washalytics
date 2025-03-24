import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ Review, Machine, Profile }) => {
    const [userData, setUserData] = useState(null);
    const limitedReviews = Review.slice(0, 2);
    const navigate = useNavigate();

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

    const categorizeMachines = (machines) => {
        const result = {
            Good: 0,
            Moderate: 0,
            NeedToPrepare: 0
        };

        if (!Array.isArray(machines)) return result;

        machines.forEach(machine => {
            const times = parseInt(machine.Times, 10) || 0;

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

    const result = categorizeMachines(Machine);

    const handleAdd = () => {
        console.log("Navigating to add machine");
        navigate("/add_machine");
    };
    

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
    
      
    const renderStars = (rate) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rate) {
                stars.push(
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 1.66669L12.5751 6.88335L18.3334 7.72502L14.1667 11.7834L15.1501 17.5167L10.0001 14.8084L4.85008 17.5167L5.83341 11.7834L1.66675 7.72502L7.42508 6.88335L10.0001 1.66669Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                );
            } else {
                stars.push(
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 1.66669L12.5751 6.88335L18.3334 7.72502L14.1667 11.7834L15.1501 17.5167L10.0001 14.8084L4.85008 17.5167L5.83341 11.7834L1.66675 7.72502L7.42508 6.88335L10.0001 1.66669Z" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                );
            }
        }
        return stars;
    };

    const ReviewElements = limitedReviews.map((review, index) => (
        <div className='review-content textbox blue-border' key={index}>
            <h3 className='rate-comment'>{renderStars(review.rate)}</h3>
            <p className='comment'>{review.comment}</p>

            <div>
            <div className="profile-review">
            <img className='profile' src="./unknow.jpg" />
            </div>
            <p className='Ratename'>{review.Name}</p>
            <p className='date'>{review.date}</p>
            </div>
        </div>
    ));
    

    return (
        <div>
           <header className='header-0'>
                <div onClick={handleProfile} className="profile-content">
                    <img className='profile' src={userData?.photo || "unknown.jpg"} alt="Profile" />
                </div>
                <h2 className='Name'>{userData?.Owner_name || "Guest"}</h2>
                <svg className="ring" width="26" height="28" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.73 21C12.5542 21.3031 12.3018 21.5547 11.9982 21.7295C11.6946 21.9044 11.3504 21.9965 11 21.9965C10.6496 21.9965 10.3054 21.9044 10.0018 21.7295C9.69816 21.5547 9.44581 21.3031 9.27 21M17 8C17 6.4087 16.3679 4.88258 15.2426 3.75736C14.1174 2.63214 12.5913 2 11 2C9.4087 2 7.88258 2.63214 6.75736 3.75736C5.63214 4.88258 5 6.4087 5 8C5 15 2 17 2 17H20C20 17 17 15 17 8Z" stroke="#29B6F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </header>

            <main className='main-home'>
                <div className='blue-blox block-money'>
                    <div>
                        <p className='Title-money'>Total Income</p>
                        <p className='Total margin-money'>3521651<p className='bath'>THB</p></p>

                        <p className='Title-money'>Monthly</p>
                        <p className='Monthly margin-money'>N/a <p className='bath'>THB</p></p>

                        <p className='Title-money'>Daily</p>
                        <p className='Daily margin-money'>N/a <p className='bath'>THB</p></p>
                        </div>

                        <div className='cont'>
                            <div className='square'>  </div>
                        </div>
                    </div>
                    <div>
                        <div className='line-machine'>
                            <h2>Machine</h2>
                            <div onClick={handleAdd} className='add-machine'>
                                <svg  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1.66669V20.3334M1.66663 11H20.3333" stroke="#29B6F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <div className='iconmachine'>
                            <div className='machine-icon'>
                                <svg width="86" height="98" viewBox="0 0 86 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M77.375 2.125H8.625C5.17321 2.125 2.375 4.92321 2.375 8.375V89.625C2.375 93.0767 5.17321 95.875 8.625 95.875H77.375C80.8267 95.875 83.625 93.0767 83.625 89.625V8.375C83.625 4.92321 80.8267 2.125 77.375 2.125Z" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14.875 14.625H27.375" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M72.1667 12.3334V16.5" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M59.6667 12.3334V16.5" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.375 27.125H83.625" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M43 83.375C55.0812 83.375 64.875 73.5812 64.875 61.5C64.875 49.4188 55.0812 39.625 43 39.625C30.9188 39.625 21.125 49.4188 21.125 61.5C21.125 73.5812 30.9188 83.375 43 83.375Z" stroke="#B8CF7E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p className='quantity' style={{color:'#B8CF7E'}}>{result.Good}</p>
                                <p className='perform' style={{color:'#B8CF7E'}}>Good</p>
                            </div>

                            <div className='machine-icon'>
                                <svg width="86" height="98" viewBox="0 0 86 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M77.375 2.125H8.625C5.17321 2.125 2.375 4.92321 2.375 8.375V89.625C2.375 93.0767 5.17321 95.875 8.625 95.875H77.375C80.8267 95.875 83.625 93.0767 83.625 89.625V8.375C83.625 4.92321 80.8267 2.125 77.375 2.125Z" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14.875 14.625H27.375" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M72.1667 12.3334V16.5" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M59.6667 12.3334V16.5" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.375 27.125H83.625" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M43 83.375C55.0812 83.375 64.875 73.5812 64.875 61.5C64.875 49.4188 55.0812 39.625 43 39.625C30.9188 39.625 21.125 49.4188 21.125 61.5C21.125 73.5812 30.9188 83.375 43 83.375Z" stroke="#FFC96B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p className='quantity' style={{color:'#FFC96B'}}>{result.Moderate}</p>
                                <p className='perform' style={{color:'#FFC96B'}}>Moderate</p>
                            </div>

                            <div className='machine-icon'>
                                <svg width="86" height="98" viewBox="0 0 86 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M77.375 2.125H8.625C5.17321 2.125 2.375 4.92321 2.375 8.375V89.625C2.375 93.0767 5.17321 95.875 8.625 95.875H77.375C80.8267 95.875 83.625 93.0767 83.625 89.625V8.375C83.625 4.92321 80.8267 2.125 77.375 2.125Z" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14.875 14.625H27.375" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M72.1667 12.3334V16.5" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M59.6667 12.3334V16.5" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.375 27.125H83.625" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M43 83.375C55.0812 83.375 64.875 73.5812 64.875 61.5C64.875 49.4188 55.0812 39.625 43 39.625C30.9188 39.625 21.125 49.4188 21.125 61.5C21.125 73.5812 30.9188 83.375 43 83.375Z" stroke="#FF796D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p className='quantity' style={{color:'#FF796D'}}>{result.NeedToPrepare}</p>
                                <p className='perform' style={{color:'#FF796D'}}>Needs to</p>
                                <p className='perform' style={{color:'#FF796D'}}>Repair</p>
                            </div>
                        </div>
                        
                        <h2>Recent Review</h2>
                        <div id="scrollx" className='view'>
                            {ReviewElements}
                            <Link to="/Review" className='more-content blue-border'>
                                <div>
                                <svg width="36" height="8" viewBox="0 0 36 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6C19.1046 6 20 5.10457 20 4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4C16 5.10457 16.8954 6 18 6Z" stroke="#29B6F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M32 6C33.1046 6 34 5.10457 34 4C34 2.89543 33.1046 2 32 2C30.8954 2 30 2.89543 30 4C30 5.10457 30.8954 6 32 6Z" stroke="#29B6F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#29B6F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p style={{color:'#29B6F6',marginTop:"10px"}}>More</p>
                                </div>
                            </Link>
                        </div>
                    </div>
            </main>
            <footer>
            <Link to="/Home" className='svg-icon'>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" fill="#29B6F6"/>
            <path d="M9.5 22V12H15.5V22" fill="#29B6F6"/>
            <path d="M9.5 22V12H15.5V22M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <p className='icon active-icon'>Home</p>
            </Link>
            <Link to="/Analytics" className='svg-icon'>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 2L13.5 11.5L8.5 6.5L1 14M23 2H17M23 2V8" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Analytics</p>
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
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2L15.59 8.26L22.5 9.27L17.5 14.14L18.68 21.02L12.5 17.77L6.32 21.02L7.5 14.14L2.5 9.27L9.41 8.26L12.5 2Z" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Review</p>
            </Link>
            </footer>
        </div>
    )
}

export default Home;