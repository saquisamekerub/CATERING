import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FinalOrder.css';
import Navbar from '../NavbarUser/Navbar';
import { Link } from 'react-router-dom';
 
const CustomFinal = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const selectedVariations = state?.selectedVariations || {};
 
    // Separate package customizations from food customizations
    const packageItems = Object.entries(selectedVariations).filter(
      ([item]) => !["Pork", "Beef", "Chicken", "Vegetables", "Fish", "Noodles", "Dessert", "Juice"].includes(item)
    );
 
    const foodItems = Object.entries(selectedVariations).filter(
      ([item]) => ["Pork", "Beef", "Chicken", "Vegetables", "Fish", "Noodles", "Dessert", "Juice"].includes(item)
    );
 
    // Navigate back to the previous page
    const handleBack = () => {
      navigate(-1); // Navigate to the previous page
    };
 
    // Handle done button functionality
    const handleDone = () => {
      alert('Order Confirmed!');
      navigate('/confirmation'); // Redirect to a confirmation or another page
    };
 
    return (
      <>
        <Navbar />
        <div className="final-order-page">
          <main>
            <h1 className="final-order-title">CUSTOMER FINAL ORDER</h1>
            <div className="order-container">
             
              {/* Custom Package Details */}
              <div className="package-details">
                <h2>CUSTOM PACKAGE</h2>
                <div className="inclusion-box">
                  <h3>Inclusion</h3>
                  <ul>
                    {packageItems.map(([item, variation], index) => (
                      <li key={index}>{item}: {variation}</li>
                    ))}
                  </ul>
                </div>
              </div>
 
              {/* Food Inclusion Details */}
              <div className="food-details">
                <h3>FOOD INCLUSION</h3>
                <ul>
                  {foodItems.map(([food, variation], index) => (
                    <li key={index}>{food}: {variation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
 
          <footer>
            <button className="back-btn" onClick={handleBack}>BACK</button>
            <Link to="/Services/EventForm">
              <button className="done-btn" onClick={handleDone}>DONE</button>
            </Link>
          </footer>
        </div>
      </>
    );
  };
 
  export default CustomFinal;