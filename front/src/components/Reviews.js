import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Reviews = ({ Review, Profile }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const limitedReviews = Review.slice(0, 2);

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
    
    const ReviewElements = Review.map((review, index) => (
        <div className='review-cont textbox blue-border' key={index}>
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
            <header className='header-5'>

                <div onClick={handleProfile} className="profile-content right">
                    <img className='profile' src={userData?.photo || "unknown.jpg"} alt="Profile" />
                </div>
                <h2 className='TxReview' >Review</h2>
                <div className='RateMean'>
                    <h1 style={{color:'#29B6F6',fontSize:'36px'}}>4.6</h1>
                    <div className='stars'>
                        <div className='star'>
                            <svg width="70" height="13" viewBox="0 0 70 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_48_246)">
                            <path d="M6.0346 1.00575L7.58847 4.15374L11.0633 4.66164L8.54896 7.11064L9.14235 10.5704L6.0346 8.93607L2.92684 10.5704L3.52023 7.11064L1.00586 4.66164L4.48072 4.15374L6.0346 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip1_48_246)">
                            <path d="M20.5175 1.00575L22.0714 4.15374L25.5462 4.66164L23.0319 7.11064L23.6253 10.5704L20.5175 8.93607L17.4097 10.5704L18.0031 7.11064L15.4888 4.66164L18.9636 4.15374L20.5175 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip2_48_246)">
                            <path d="M35.0002 1.00575L36.554 4.15374L40.0289 4.66164L37.5145 7.11064L38.1079 10.5704L35.0002 8.93607L31.8924 10.5704L32.4858 7.11064L29.9714 4.66164L33.4463 4.15374L35.0002 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip3_48_246)">
                            <path d="M49.4828 1.00575L51.0367 4.15374L54.5116 4.66164L51.9972 7.11064L52.5906 10.5704L49.4828 8.93607L46.3751 10.5704L46.9685 7.11064L44.4541 4.66164L47.929 4.15374L49.4828 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip4_48_246)">
                            <path d="M63.9657 1.00575L65.5196 4.15374L68.9945 4.66164L66.4801 7.11064L67.0735 10.5704L63.9657 8.93607L60.858 10.5704L61.4514 7.11064L58.937 4.66164L62.4119 4.15374L63.9657 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_48_246">
                            <rect width="12.069" height="12.069" fill="white"/>
                            </clipPath>
                            <clipPath id="clip1_48_246">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(14.4829)"/>
                            </clipPath>
                            <clipPath id="clip2_48_246">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(28.9656)"/>
                            </clipPath>
                            <clipPath id="clip3_48_246">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(43.4482)"/>
                            </clipPath>
                            <clipPath id="clip4_48_246">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(57.9312)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <hr></hr>
                        </div>
                        <div className='star'>
                            <svg width="70" height="13" viewBox="0 0 70 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_48_235)">
                            <path d="M6.0346 1.00575L7.58847 4.15374L11.0633 4.66164L8.54896 7.11064L9.14235 10.5704L6.0346 8.93607L2.92684 10.5704L3.52023 7.11064L1.00586 4.66164L4.48072 4.15374L6.0346 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip1_48_235)">
                            <path d="M20.5175 1.00575L22.0714 4.15374L25.5462 4.66164L23.0319 7.11064L23.6253 10.5704L20.5175 8.93607L17.4097 10.5704L18.0031 7.11064L15.4888 4.66164L18.9636 4.15374L20.5175 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip2_48_235)">
                            <path d="M35.0002 1.00575L36.554 4.15374L40.0289 4.66164L37.5145 7.11064L38.1079 10.5704L35.0002 8.93607L31.8924 10.5704L32.4858 7.11064L29.9714 4.66164L33.4463 4.15374L35.0002 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip3_48_235)">
                            <path d="M49.4828 1.00575L51.0367 4.15374L54.5116 4.66164L51.9972 7.11064L52.5906 10.5704L49.4828 8.93607L46.3751 10.5704L46.9685 7.11064L44.4541 4.66164L47.929 4.15374L49.4828 1.00575Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M63.9657 1.00575L65.5196 4.15374L68.9945 4.66164L66.4801 7.11064L67.0735 10.5704L63.9657 8.93607L60.858 10.5704L61.4514 7.11064L58.937 4.66164L62.4119 4.15374L63.9657 1.00575Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <clipPath id="clip0_48_235">
                            <rect width="12.069" height="12.069" fill="white"/>
                            </clipPath>
                            <clipPath id="clip1_48_235">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(14.4829)"/>
                            </clipPath>
                            <clipPath id="clip2_48_235">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(28.9656)"/>
                            </clipPath>
                            <clipPath id="clip3_48_235">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(43.4482)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <hr></hr>
                        </div>
                        <div className='star'>
                            <svg width="70" height="13" viewBox="0 0 70 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_48_213)">
                            <path d="M6.0346 1.00574L7.58847 4.15373L11.0633 4.66163L8.54896 7.11062L9.14235 10.5704L6.0346 8.93605L2.92684 10.5704L3.52023 7.11062L1.00586 4.66163L4.48072 4.15373L6.0346 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip1_48_213)">
                            <path d="M20.5175 1.00574L22.0714 4.15373L25.5462 4.66163L23.0319 7.11062L23.6253 10.5704L20.5175 8.93605L17.4097 10.5704L18.0031 7.11062L15.4888 4.66163L18.9636 4.15373L20.5175 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip2_48_213)">
                            <path d="M35.0002 1.00574L36.554 4.15373L40.0289 4.66163L37.5145 7.11062L38.1079 10.5704L35.0002 8.93605L31.8924 10.5704L32.4858 7.11062L29.9714 4.66163L33.4463 4.15373L35.0002 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip3_48_213)">
                            <path d="M49.4828 1.00574L51.0367 4.15373L54.5116 4.66163L51.9972 7.11062L52.5906 10.5704L49.4828 8.93605L46.3751 10.5704L46.9685 7.11062L44.4541 4.66163L47.929 4.15373L49.4828 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M63.9657 1.00574L65.5196 4.15373L68.9945 4.66163L66.4801 7.11062L67.0735 10.5704L63.9657 8.93605L60.858 10.5704L61.4514 7.11062L58.937 4.66163L62.4119 4.15373L63.9657 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <clipPath id="clip0_48_213">
                            <rect width="12.069" height="12.069" fill="white"/>
                            </clipPath>
                            <clipPath id="clip1_48_213">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(14.4829)"/>
                            </clipPath>
                            <clipPath id="clip2_48_213">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(28.9656)"/>
                            </clipPath>
                            <clipPath id="clip3_48_213">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(43.4482)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <hr></hr>
                        </div>
                        <div className='star'>
                            <svg width="70" height="13" viewBox="0 0 70 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_48_202)">
                            <path d="M6.0346 1.00574L7.58847 4.15373L11.0633 4.66163L8.54896 7.11062L9.14235 10.5704L6.0346 8.93605L2.92684 10.5704L3.52023 7.11062L1.00586 4.66163L4.48072 4.15373L6.0346 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip1_48_202)">
                            <path d="M20.5175 1.00574L22.0714 4.15373L25.5462 4.66163L23.0319 7.11062L23.6253 10.5704L20.5175 8.93605L17.4097 10.5704L18.0031 7.11062L15.4888 4.66163L18.9636 4.15373L20.5175 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M35.0002 1.00574L36.5541 4.15373L40.0289 4.66163L37.5145 7.11062L38.1079 10.5704L35.0002 8.93605L31.8924 10.5704L32.4858 7.11062L29.9714 4.66163L33.4463 4.15373L35.0002 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <g clip-path="url(#clip2_48_202)">
                            <path d="M49.4828 1.00574L51.0367 4.15373L54.5116 4.66163L51.9972 7.11062L52.5906 10.5704L49.4828 8.93605L46.3751 10.5704L46.9685 7.11062L44.4541 4.66163L47.929 4.15373L49.4828 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M63.9657 1.00574L65.5196 4.15373L68.9945 4.66163L66.4801 7.11062L67.0735 10.5704L63.9657 8.93605L60.858 10.5704L61.4514 7.11062L58.937 4.66163L62.4119 4.15373L63.9657 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <clipPath id="clip0_48_202">
                            <rect width="12.069" height="12.069" fill="white"/>
                            </clipPath>
                            <clipPath id="clip1_48_202">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(14.4829)"/>
                            </clipPath>
                            <clipPath id="clip2_48_202">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(43.4482)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <hr></hr>
                        </div>
                        <div className='star'>
                            <svg width="70" height="13" viewBox="0 0 70 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_47_6759)">
                            <path d="M6.0346 1.00574L7.58847 4.15373L11.0633 4.66163L8.54896 7.11062L9.14235 10.5704L6.0346 8.93605L2.92684 10.5704L3.52023 7.11062L1.00586 4.66163L4.48072 4.15373L6.0346 1.00574Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <g clip-path="url(#clip1_47_6759)">
                            <path d="M20.5175 1.00574L22.0714 4.15373L25.5462 4.66163L23.0319 7.11062L23.6253 10.5704L20.5175 8.93605L17.4097 10.5704L18.0031 7.11062L15.4888 4.66163L18.9636 4.15373L20.5175 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M35.0002 1.00574L36.5541 4.15373L40.0289 4.66163L37.5145 7.11062L38.1079 10.5704L35.0002 8.93605L31.8924 10.5704L32.4858 7.11062L29.9714 4.66163L33.4463 4.15373L35.0002 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <g clip-path="url(#clip2_47_6759)">
                            <path d="M49.4828 1.00574L51.0367 4.15373L54.5116 4.66163L51.9972 7.11062L52.5906 10.5704L49.4828 8.93605L46.3751 10.5704L46.9685 7.11062L44.4541 4.66163L47.929 4.15373L49.4828 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <path d="M63.9657 1.00574L65.5196 4.15373L68.9945 4.66163L66.4801 7.11062L67.0735 10.5704L63.9657 8.93605L60.858 10.5704L61.4514 7.11062L58.937 4.66163L62.4119 4.15373L63.9657 1.00574Z" stroke="#29B6F6" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <clipPath id="clip0_47_6759">
                            <rect width="12.069" height="12.069" fill="white"/>
                            </clipPath>
                            <clipPath id="clip1_47_6759">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(14.4829)"/>
                            </clipPath>
                            <clipPath id="clip2_47_6759">
                            <rect width="12.069" height="12.069" fill="white" transform="translate(43.4482)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <hr></hr>
                        </div>
                    </div>
                </div>
                <select className="input-bx select-review" name="Type" id="Type">
                    <option style={{fontSize: '14px'}} value="Most Recent">Most Recent</option>
                    <option style={{fontSize: '14px'}} value="Most Helpful">Most Helpful</option>
                    <option style={{fontSize: '14px'}} value="Most Critical">Most Critical</option>
                </select>
            </header>

            <main className='main-review'>
                
                <div className='view'>
                    {ReviewElements}
                </div>

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
            <path d="M11.5 2L14.59 8.26L21.5 9.27L16.5 14.14L17.68 21.02L11.5 17.77L5.32 21.02L6.5 14.14L1.5 9.27L8.41 8.26L11.5 2Z" fill="#29B6F6" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <p className='icon active-icon'>Review</p>
            </Link>
            </footer>
        </div>
    )
}

export default Reviews;