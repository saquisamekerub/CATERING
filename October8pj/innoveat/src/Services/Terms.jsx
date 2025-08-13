import React, { useState } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css";
import "./Terms.css";
import Navbar from "../NavbarUser/Navbar"; // Import Navbar
import { Link } from "react-router-dom"; // Import Link for navigation

function Terms() {
  // State to manage checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Handler to toggle checkbox state
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Navbar />
      <div className="terms-container">
        <div className="terms-body">
          <h2 className="terms-title">Terms and Conditions</h2>
          <div className="terms-content">
            <p>
              This Catering Contract is entered into between two parties namely:
              <br />
              <b>KERUB M. SAQUISAME</b> of Kyle & Kerub Party Needs & Catering Services, with address at 248 Bucandala, Imus, Cavite and
              <br />
              ______________. This sets forth the agreement between the Parties relating to catering services to be provided by the Caterer for Client for the event identified in this Contract stating below.
            </p>
            <ul>
              <li>As much as possible, no bringing/serving of other foods to avoid any legal issues that could arise from serving food not prepared by the Caterer.</li>
              <li>Take note that the client is required to pay 50% of the total price upon reservation & 50% on the day of the event.</li>
              <li>No Downpayment means No Reservation. STRICTLY NON REFUNDABLE.</li>
              <li>DAMAGE to any rentals will be charged to the client.</li>
              <li>Additional 10% service charge in excess of the number of pax in the contract.</li>
              <li>Charge of Php 1,000 for overnight use of Catering Equipments/Utensils to defray gasoline & manpower expenses.</li>
              <li>Overtime pay of servers at Php 100 per hour per waiter.</li>
              <li>A service charge of Php 500 per floor for functions held on second or higher floors.</li>
              <li>Three (3) hours are allocated for tables & chairs set-up.</li>
              <li>Tour/Use hours are allocated for your service; the standard time is from 11:00 am to 3:00 pm; or</li>
              <li>One (1) hour for pack up/egress 12:00 nn to 4:00 pm; or</li>
              <li>1:00 pm to 5:00 pm for lunch.</li>
              <li>2:00 pm to 6:00 pm for snack.</li>
              <li>3:00 pm to 7:00 pm for snack.</li>
              <li>5:00 pm to 9:00 pm for dinner.</li>
            </ul>
          </div>
          
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="termsCheckbox" 
              checked={isChecked} 
              onChange={handleCheckboxChange} 
            />
            <label htmlFor="termsCheckbox"> I accept the terms and conditions</label>
          </div>
          <div className="button-row">
            <Link to="/Services/DownPayment">
              <button 
                type="button" 
                className="btn btn-success" 
                disabled={!isChecked} // Disable button if not checked
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
