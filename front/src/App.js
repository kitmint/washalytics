import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Review, Machine, Profile, Income } from './components/Data.js';

// Import Components
import Reviews from './components/Reviews.js';
import Machines from './components/machine.js';
import MachineDetail from './components/machinedetail.js';
import Finances from './components/finance.js';
import Analytics from './components/analytics.js';
import AddMachine from './components/add_machine.js';
import Home from './components/home'; 

// Import Register Pages
import Firstpage from './registers/firstpage';
import Login from './registers/login';
import Signup from './registers/signup';
import Addbransh from './registers/add';
import LaundryInfo from './registers/laundryInfo';
import Profiles from './registers/profile';

// Import Styles
import './App.css';
import './components/finance.css'
import './components/analytics.css'
import './registers/styles.css'
import './components/home.css'
import './components/review.css'
import './components/machine.css'

function App() {
  return (
    <Router>
      <div className="App">        
        <Routes>
          {/* Route for the first page */}
          <Route path="/" element={<Firstpage />} />
          
          {/* Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Route for Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Route for Add Branch */}
          <Route path="/add_branch" element={<Addbransh />} />

          {/* Route for Laundry Info */}
          <Route path="/laundryInfo" element={<LaundryInfo />} />
          
          {/* Route for Accounting */}
          <Route path="/accounting" element={<Finances Profile={Profile} Income={Income}/>} />

          <Route path="/Analytics" element={<Analytics Profile={Profile} Machine={Machine} Income={Income}/>} />
          

          {/* Route for Home */}
          <Route path="/home" element={<Home Profile={Profile} Review={Review} Machine={Machine}/>} />

          {/* Route for Reviews */}
          <Route path="/review" element={<Reviews Profile={Profile} Review={Review}/>} />

          {/* Route for Add Machine */}
          <Route path="/add_machine" element={<AddMachine />} />

          {/* Route for Machines */}
          <Route path="/machine" element={<Machines Profile={Profile} Machine={Machine} />} />

          {/* Route for Machine Details */}
          <Route path="/machine/:ID" element={<MachineDetail Machine={Machine} />} />

          {/* Route for Profile */}
          <Route path="/profile/:customerId" element={<Profiles />} />

          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
