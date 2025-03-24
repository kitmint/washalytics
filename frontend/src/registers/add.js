import { Link } from "react-router-dom";

const Addbransh = () => {
    return (
        <div>
             <main className="main-0">
                <div className="logo">
                    <img className="logoimage" src="./Logo.png"/>
                    <h1 className="logomessage Jaro">WashAlytics</h1>
                </div>
                <div className="all-img">
                    <img className="img1" src="./3D Laundry Basket.png"/>
                    <img className="img2" src="./Woman Jump On Money.png"/>
                    <img className="img3" src="./Coin And Chart.png"/>
                </div>
                <div className="hello">
                    <h3>Create Account Successful !!!</h3>
                    <Link  to="/Home" className="bl-btn long-btn">Add Branch</Link>
                </div>
            </main>
        </div>
    );
};

export default Addbransh;