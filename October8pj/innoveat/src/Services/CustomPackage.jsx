import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomPackage.css';
import { Button } from 'react-bootstrap';
import Navbar from "../NavbarUser/Navbar";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Package Customization Items
import table from "../assets/table.png";
import table_cover from "../assets/table_cover.jpg";
import backdrop from "../assets/backdrop.jpg";
import balloon from "../assets/balloon.jpg";
import chair_cover from "../assets/chair_cover.jpg";
import chair from "../assets/chair.jpg";
import entertainment from "../assets/magician.jpg";
import center_piece from "../assets/center_piece.jpg";
import napkin from "../assets/napkin.jpg";

// Food Customization Items
import beef from "../assets/beef2.jpg";
import chicken from "../assets/chicks.webp";
import dessert from "../assets/choco.jpeg";
import fish from "../assets/fish.jpg";
import juice from "../assets/juice.jpg";
import noodles from "../assets/pasta.jpg";
import pork from "../assets/pork.jpg";
import vegetable from "../assets/vegetable.jpg";

const CustomPackItems = [
  { name: 'Chair', variations: ['Tiffany', 'Monobloc', 'Kiddie'], image: chair },
  { name: 'Chair Cover', variations: ['Pink', 'Blue', 'Green', 'Violet', 'Yellow'], image: chair_cover },
  { name: 'Table', variations: ['Rectangle', 'Circle', 'Square', 'Kiddie Table'], image: table },
  { name: 'Table Cover', variations: ['Pink', 'Blue', 'Green', 'Violet', 'Yellow'], image: table_cover },
  { name: 'Napkin Color', variations: ['Pink', 'Blue', 'Green', 'Violet', 'Yellow'], image: napkin },
  { name: 'Backdrop Shape', variations: ['Arc', 'Round', 'Square'], image: backdrop },
  { name: 'Balloon Color', variations: ['Pink', 'Blue', 'Green', 'Violet', 'Yellow'], image: balloon },
  { name: 'Center Piece', variations: ['Balloon', 'Artificial Flower', 'Crystal'], image: center_piece },
  { name: 'Entertainment', variations: ['Clown', 'Magician', 'Videoke', 'Sounds & Lights', 'Live Band', 'Photobooth'], image: entertainment }
];

const foodItems = [
  { name: 'Pork', variations: ['Grilled Pork', 'Roast Pork', 'Pork Stew', 'Pork Asado'], image: pork },
  { name: 'Beef', variations: ['Beef Steak', 'Beef Stir Fry', 'Beef Roast'], image: beef },
  { name: 'Chicken', variations: ['Fried Chicken', 'Grilled Chicken', 'Chicken Curry'], image: chicken },
  { name: 'Vegetables', variations: ['Vegetable Stir Fry', 'Salad', 'Roasted Veggies'], image: vegetable },
  { name: 'Fish', variations: ['Grilled Fish', 'Fried Fish', 'Fish Curry'], image: fish },
  { name: 'Noodles', variations: ['Spaghetti', 'Carbonara', 'Pesto'], image: noodles },
  { name: 'Dessert', variations: ['Cake', 'Ice Cream', 'Pudding'], image: dessert },
  { name: 'Juice', variations: ['Soda', 'Juice', 'Water'], image: juice }
];

const CustomPackage = () => {
  const [selectedEquipments, setselectedEquipments] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the selected package from location.state
  const { selectedPackage } = location.state || {};

  const event_id = selectedPackage?.event_id || localStorage.getItem('event_id');
  const user_id = selectedPackage?.user_id || localStorage.getItem('user_id');

  useEffect(() => {
    const savedSelections = JSON.parse(localStorage.getItem('foodSelections'));
    
    if (savedSelections) {
      setselectedEquipments(savedSelections);
    }
  }, []);

  // Function to handle selection changes
  const handleSelectChange = (itemName, variation) => {
    setselectedEquipments((prevSelections) => ({
      ...prevSelections,
      [itemName]: variation,
    }));

  };

  const handleConfirm = async () => {
    // Ensure user and event IDs are defined
    if (!user_id || !event_id) {
      alert('Missing required fields. Please ensure user and event are selected.');
      return;
    }

    const payload = {
      event_id: event_id,
      user_id: user_id,
      selections: {
        Chair: selectedEquipments['Chair'] || '',
        'Chair Cover': selectedEquipments['Chair Cover'] || '',
        Table: selectedEquipments['Table'] || '',
        'Table Cover': selectedEquipments['Table Cover'] || '',
        'Napkin Color': selectedEquipments['Napkin Color'] || '',
        'Backdrop Shape': selectedEquipments['Backdrop Shape'] || '',
        'Balloon Color': selectedEquipments['Balloon Color'] || '',
        'Center Piece': selectedEquipments['Center Piece'] || '',
        Entertainment: selectedEquipments['Entertainment'] || '',
      },
      status: 'Pending'
    };

    setLoading(true);

    try {
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/CustomPackage.php', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response from server:', response.data);

      if (response.data && response.data.status === 'success') {
        alert('Food choices and equipment package saved successfully!');

        // Clear local storage for food selections
        localStorage.removeItem('foodSelections');
        localStorage.removeItem('event_id');
        localStorage.setItem("Equipments", JSON.stringify(selectedEquipments));
        // Navigate to FinalOrder with the selected package and food selections
        navigate('/Services/Foodpackage', {
          state: {
            selectedEquipments,
            selectedPackage: {
              user_id: payload.user_id,
              event_id: payload.event_id,
            },
          },
        });
      } else {
        alert(response.data.message || 'Failed to save food choices and equipment package.');
      }
    } catch (error) {
      console.error('Error saving food package and equipment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="text-center my-4">
          <h1 className="furnitures-title">PACKAGE CUSTOMIZATION</h1>
        </div>
        <div className="scrollable-container">
          <div className="row text-center">
            {CustomPackItems.map((item) => (
              <div key={item.name} className="col-md-3 mb-4">
                <div className="furnitures-item">
                  <img src={item.image} alt={item.name} className="img-fluid rounded" />
                  <select
                    className="form-select mt-2"
                    value={selectedEquipments[item.name] || ''}
                    onChange={(e) => handleSelectChange(item.name, e.target.value)}
                  >
                    <option value="" disabled>{item.name}</option>
                    {item.variations.map((variation, idx) => (
                      <option key={idx} value={variation}>{variation}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center my-4">
          <Button variant="primary" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Saving...' : 'Confirm Package'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomPackage;
