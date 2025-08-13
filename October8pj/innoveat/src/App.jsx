  import React from 'react';
  import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
  import logo from './assets2/InnoveatLogo.png';
  import Orders from './Orders/Orders.jsx';
  import TransactionHistory from './TransactionHistory/TransactionHistory.jsx';
  import Calendars from  './Calendar/Calendars.jsx';
  import EventChart from './Graph/EventChart.jsx';;;
  import Login from './Admin&UserLogin/Login.jsx';
  import Signup from './Admin&UserLogin/Signup.jsx';
  import PaxPanel from "./Services/PaxPanel"; 
  import Package from "./Services/Package"; 
  import Foodpackage from "./Services/Foodpackage.jsx"; 
  import CustomPackage from "./Services/CustomPackage";
  import FinalOrder from './Services/FinalOrder';
  import CustomFinal from './Services/CustomFinal.jsx';
  import EventForm from './Services/EventForm';
  import ConfirmReservation from './Services/ConfirmReservation';
  import Terms from './Services/Terms';
  import DownPayment from './Services/DownPayment';
  import Home from "./Home/Home";
  import AboutUs from "./AboutUs/AboutUs";
  import Services from "./Services/Event.jsx";
  import Portfolio from  "./Portfolio/Portfolio.jsx";

  function App() {    
    return (
      <Router>  
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Calendars" element={<Calendars />} />
              <Route path="/TransactionHistory" element={<TransactionHistory />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/EventChart" element={<EventChart />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Portfolio" element={<Portfolio />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/Services/PaxPanel" element={<PaxPanel />} />
              <Route path="/Services/Package" element={<Package />} />
              <Route path="/Services/Foodpackage" element={<Foodpackage/>} />
              <Route path="/Services/CustomPackage" element={<CustomPackage />} />
              <Route path="/Services/FinalOrder" element={<FinalOrder />} />
              <Route path="/Services/CustomFinal" element={<CustomFinal />} />
              <Route path="/Services/EventForm" element={<EventForm />} />
              <Route path="/Services/ConfirmReservation" element={<ConfirmReservation />} />
              <Route path="/Services/Terms" element={<Terms />} />
              <Route path="/Services/DownPayment" element={<DownPayment />} />
              <Route path="/Home" element={<Home />} />

            </Routes>
    </Router>
    )
  }

  export default App;
