import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FoodChoice.css';
import pork from "../assets/pork.jpg";
import beef from "../assets/beef2.jpg";
import chicken from "../assets/chicks.webp";
import vegie from "../assets/vege.jpg";
import fish from "../assets/fish.jpg";
import pasta from "../assets/pasta.jpg";
import dessert from "../assets/choco.jpeg";
import drinks from "../assets/drink.jpg";
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../NavbarUser/Navbar";
import axios from 'axios';

// Food items array
const foodItems = [
  { name: 'Pork', image: pork, variations: ['Grilled Pork', 'Roast Pork', 'Pork Stew', 'Pork Asado'] },
  { name: 'Beef', image: beef, variations: ['Beef Steak', 'Beef Stir Fry', 'Beef Roast'] },
  { name: 'Chicken', image: chicken, variations: ['Fried Chicken', 'Grilled Chicken', 'Chicken Curry'] },
  { name: 'Vegetables', image: vegie, variations: ['Vegetable Stir Fry', 'Salad', 'Roasted Veggies'] },
  { name: 'Fish', image: fish, variations: ['Grilled Fish', 'Fried Fish', 'Fish Curry'] },
  { name: 'Pasta', image: pasta, variations: ['Spaghetti', 'Carbonara', 'Pesto'] },
  { name: 'Dessert', image: dessert, variations: ['Cake', 'Ice Cream', 'Pudding'] },
  { name: 'Drinks', image: drinks, variations: ['Soda', 'Juice', 'Water'] }
];

const Foodpackage = () => {
  const [selectedVariations, setSelectedVariations] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedEquipments } = location.state || {};


  // Retrieve selectedPackage from state or fallback to localStorage
  const selectedPackage = {
    ...location.state?.selectedPackage,
    equip_pckg_id: location.state?.selectedPackage?.equip_pckg_id || 1,
    event_id: location.state?.selectedPackage?.event_id || localStorage.getItem('event_id') || null
  };

  // Insert the console log here
  console.log('Selected Package:', selectedPackage);

  useEffect(() => {
    console.log(selectedPackage);
    // Load previous food selections from localStorage if available
    const savedSelections = JSON.parse(localStorage.getItem('foodSelections'));
    if (savedSelections) {
      setSelectedVariations(savedSelections);
    }
  }, []);

  // Handle food selection changes
  const handleSelectChange = (foodName, variation) => {
    const newSelections = {
      ...selectedVariations,
      [foodName]: variation,
    };
    setSelectedVariations(newSelections);

    // Save to localStorage
    localStorage.setItem('foodSelections', JSON.stringify(newSelections)); // Use newSelections
  };

  const handleConfirm = async () => {
    const { user_id, event_id, equip_pckg_id } = selectedPackage;

    if (!user_id || !event_id || !equip_pckg_id) {
      alert('Missing required fields. Please ensure user, event, and equipment package are selected.');
      return;
    }

    const payload = {
      pork: selectedVariations.Pork || '',
      beef: selectedVariations.Beef || '',
      chicken: selectedVariations.Chicken || '',
      fish: selectedVariations.Fish || '',
      vegetables: selectedVariations.Vegetables || '',
      pasta: selectedVariations.Pasta || '',
      Dessert: selectedVariations.Dessert || '', 
      Drinks: selectedVariations.Drinks || '',      
      user_id: user_id,
      event_id: event_id, // Ensure event_id is passed
      equip_pckg_id: equip_pckg_id
    };

    setLoading(true);

    try {
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/foodpackage.php', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response from server:', response.data);

      if (response.data && response.data.status === 'Success') {
        alert('Food choices saved successfully!');

        localStorage.removeItem('foodSelections');
        localStorage.removeItem('event_id');

        // Check if the custom package is selected
        if (selectedPackage.isCustomPackage) { // Assuming `isCustom` indicates a custom package
          navigate('/Services/CustomFinal', {
            state: {
              selectedVariations,
              selectedPackage: {
                ...selectedPackage,
                event_id: response.data.event_id || event_id,
              },
              user_id,
            },
          });
        } else {
          console.log(selectedPackage);

          // Navigate to FinalOrder with the selected package and food selections
          navigate('/Services/FinalOrder', {
            state: {
              selectedVariations,
              selectedPackage: {
                ...selectedPackage,
                event_id: response.data.event_id || event_id,
              },
            },
          });
        }
      } else {
        alert(response.data.message || 'Failed to save food choices.');
      }
    } catch (error) {
      console.error('Error saving food package:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="text-center my-4">
          <h1 className="food-choice-title">FOOD CHOICE</h1>
        </div>

        <div className="scrollable-container">
          <div className="row text-center">
            {foodItems.map((food) => (
              <div key={food.name} className="col-md-3 mb-4">
                <div className="food-item">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="img-fluid rounded"
                  />
                  <select
                    className="form-select mt-2"
                    value={selectedVariations[food.name] || ''}
                    onChange={(e) => handleSelectChange(food.name, e.target.value)}
                  >
                    <option value="" disabled>{food.name}</option>
                    {food.variations.map((variation, idx) => (
                      <option key={idx} value={variation}>{variation}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading && <div className="text-center my-4">Loading...</div>}

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={handleBack} disabled={loading}>BACK</button>
          <button className="btn btn-info" onClick={handleConfirm} disabled={loading}>CONFIRM</button>
        </div>
      </div>
    </>
  );
};

export default Foodpackage;
