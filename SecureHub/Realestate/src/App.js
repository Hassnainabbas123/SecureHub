import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Loginpage from './component/Login';
import Footer from './component/Footer';
import Home from './component/Home';
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs';
// import Fpage from './Userdashboard/Fpage';
import Apage from './Admindashboard/Apage';
import AdminPage from './Admindashboard/Apage';
import Integrity from './component/Integrity';
import Fractional from './component/Fractional';
import Voting from './component/Voting';
import Liquidity from './component/Liquidity';
import Passport from './component/Passport';
import Transparency from './component/Transparency';
import PropertyOwnerPage from './Propertyownerdashboard/Owner';
import Owner from './Propertyownerdashboard/Owner';
import AddPlots from './pages/AddPlots';
import ShowAddedPlots from './pages/ShowAddedPlots';

import './App.css';

import Signup from './pages/Signup';
import OtpVerification from './pages/verify-otp';
import Login from './pages/Login';
import UserDashboard from './pages/UDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlotList from './pages/PlotList';
import PlotDetails from './pages/PlotDetails';
import SocietyPlots from './pages/SocietyPlots';
import CreatePoll from './pages/CreatePoll';
import VotePoll from './pages/VotePoll';
import Payments from './pages/Payment/Payment';
import SuccessPage from './pages/Success';
import SocietyOwnerDashboard from './pages/SoceityOwnerDashboard';

import Testimonials from './component/Testimonials';

// import Mypool from './pages/Mypool';
import SubmitProposal from './pages/SubmitProposal';
import MyProposals from './pages/MyProposals';
import AddComments from './pages/CommentOnProposals';
import MyPolls from './pages/MyPolls';


const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  //   localStorage.setItem('isAuthenticated', 'true');
  // };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="/signuppage" element={<Signuppage handleLogin={handleLogin} />} />
          <Route path="/login" element={<Loginpage handleLogin={handleLogin} />} /> */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerification" element={<OtpVerification />} />

          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/society-owner-dashboard" element={<SocietyOwnerDashboard />} />
          <Route path="/addplots" element={<AddPlots />} />
          <Route path="/showaddedplots" element={<ShowAddedPlots />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/Mypolls" element={<MyPolls />} /> 
         
<Route path="/submit-proposal" element={<SubmitProposal />} />
<Route path="/my-proposals" element={<MyProposals />} />
<Route path="/add-comments" element={<AddComments />} />

          <Route path="/plots" element={<PlotList />} />
          <Route path="/plot/:plotId" element={<PlotDetails />} />
          <Route path="/society/:societyId" element={<SocietyPlots />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/polls/" element={<VotePoll />} />
          <Route path="/Payments/:amount" element={<Payments />} />
          <Route path="/payment-success/:amountPaid/:walletPublicKey/" element={<SuccessPage />} />



          <Route path="/integrity" element={<Integrity />} />
          <Route path="/fractional" element={<Fractional />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/liquidity" element={<Liquidity />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/Signuppage" element={<Loginpage />} />
        <Route path="/Admindashboard/Apage" element={<Apage />} />
        <Route path="/propertyownerdashboard/owner" element={<PropertyOwnerPage />} />
        {/* <Route path="/userdashboard/fpage" element={<Fpage />} /> */}
          <Route path="/transparency" element={<Transparency />} />
          
          
          {/* Protected Routes */}
          {/* <Route 
            path="/userdashboard/fpage" 
            element={<ProtectedRoute isAuthenticated={isAuthenticated}><Fpage /></ProtectedRoute>} 
          /> */}
          <Route 
            path="/admindashboard/apage" 
            element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminPage /></ProtectedRoute>} 
          />
          <Route 
            path="/propertyownerdashboard/owner" 
            element={<ProtectedRoute isAuthenticated={isAuthenticated}><PropertyOwnerPage /></ProtectedRoute>} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
