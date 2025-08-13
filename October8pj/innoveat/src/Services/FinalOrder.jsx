import React, { useState, useEffect } from 'react';
import './FinalOrder.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../NavbarUser/Navbar';
import axios from 'axios'; // For HTTP requests

const FinalOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve selectedPackage and selectedVariations from the location state
  const { selectedPackage, selectedVariations } = location.state || {};

  // Extract event_id from location state or fallback to localStorage
  const [eventId, setEventId] = useState(selectedPackage?.event_id || localStorage.getItem('event_id') || null);
  const [Equipments, setEquipments] = useState([localStorage.getItem('Equipments')]);
  // State to store the userId
  const [userId, setUserId] = useState(null);

  // Retrieve user_id from localStorage on component mount
  useEffect(() => {
    const storedEquipments = localStorage.getItem('Equipments');
    if (storedEquipments) {
      setEquipments(JSON.parse(storedEquipments));
    }
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId); // Set user_id if it exists in localStorage
    console.log("FinalOrder - user_id from localStorage:", storedUserId);  // Log user_id here
    } else {
      alert('User is not logged in. Please login first.');
      navigate('/login'); // Redirect to login page if user_id is not found
    }

    // If event_id is not in location state but in localStorage, set it
    if (!eventId) {
      const storedEventId = localStorage.getItem('event_id');
      if (storedEventId) {
        setEventId(storedEventId);
      } else {
        alert('Event ID not found.');
        navigate(-1); // Go back if no event_id is found
      }
    }
  }, [navigate, eventId]);

  // Check if selectedPackage is defined
  if (!selectedPackage) {
    alert('No package selected. Please go back and select a package.');
    navigate(-1); // Navigate back if no package is selected
    return null; // Early return to prevent further execution
  }

  // Function to handle order submission
  const handleDone = async () => {
  
    if (!eventId) {
      alert('Event ID is missing. Please try again.');
      return;
    }

    // Prepare the payload for the database
    const payload = {
      event_id: eventId, // Use the retrieved or stored event_id
      equip_pckg_id: selectedPackage?.package_id || null, // Use package_id as equip_pckg_id
      user_id: userId || null,
      status: 'Pending',
    };

    console.log('Payload to send:', payload); // Log the payload to check the values

    try {
      // Send POST request to your backend
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/finalorder.php', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the save was successful
      if (response.status === 200) {
        alert('Order saved successfully!');
        
        // Store event_id in localStorage before navigating
        localStorage.setItem('event_id', eventId);
        
        // Navigate to EventForm with event_id and user_id in state
        navigate('/Services/EventForm', {
          state: {
            event_id: eventId, // Use the event_id from localStorage or state
            user_id: userId || null,
            status: 'Pending',
          },
        });
      } else {
        alert('Failed to save order: ' + response.data.message);
      }

    } catch (error) {
      console.error('Error saving order:', error);
      alert('An error occurred while saving the order. Please try again.');
    }
  };

  // Function to handle going back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <Navbar />
      <div className="final-order-page mt-5">
        <main>
          <h1 className="final-order-title">YOUR FINAL ORDER</h1>
          <div className="order-container">
            <div className="package-details">
              <h2>PACKAGE NAME: {selectedPackage?.name}</h2>
              <div className="inclusion-box">
                <h3>Inclusion</h3>
                <ul>
                {(selectedPackage.inclusion && selectedPackage.inclusion.length > 0) ? (
  selectedPackage.inclusion.map((item, index) => (
    <li key={index}>{item}</li>
  ))
) : (
  Object.entries(Equipments).length > 0 ? (
    Object.entries(Equipments).map(([itemName, variation]) => (
      <li key={itemName}>{`${itemName}: ${variation}`}</li>
    ))
  ) : (
    <li>No inclusions available</li>
  )
)}
                </ul>
              </div>
            </div>
            <div className="food-details">
              <h3>FOOD INCLUSION</h3>
              <ul>
                {Object.entries(selectedVariations || {}).map(([itemName, variation]) => (
                  <li key={itemName}>{`${itemName}: ${variation}`}</li>
                )) || <li>No food selections available</li>}
              </ul>
            </div>
          </div>
        </main>

        <footer>
          <button className="back-btn" onClick={handleBack}>BACK</button>
          <button className="btn btn-info" onClick={handleDone}>DONE</button>
        </footer>
      </div>
    </>
  );
};

export default FinalOrder;
