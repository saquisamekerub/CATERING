import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventForm.css";
import Navbar from "../NavbarUser/Navbar";

function ConfirmReservation() {
  const location = useLocation();
  const { formData } = location.state || {};
  const navigate = useNavigate();

  // Optional: Show a message if formData is not available
  if (!formData) {
    return <div>No reservation data available.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="contact-form-container">
        <div className="form-body">
          <h2 className="form-title">Confirm Reservation</h2>
          <form>
            <div className="form-row">
              <input type="date" value={formData.eventDate} readOnly className="form-control" placeholder="Event Date" />
            </div>
            <input type="text" value={formData.venueLocation} readOnly className="form-control mb-3" placeholder="Venue Location" />
            
            {/* New fields for event start time and end time */}
            <div className="form-row">
              <input type="time" value={formData.eventStartTime} readOnly className="form-row mb-3" placeholder="Event Start Time" />
              <input type="time" value={formData.eventEndTime} readOnly className="form-row mb-3" placeholder="Event End Time" />
            </div>
    
            <div className="button-row">
              <button type="button" className="btn btn-danger" onClick={() => navigate("/Services")}>Cancel</button>
              <button type="button" className="btn btn-info" onClick={() => navigate("/Portfolio")}>
                Confirm
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default ConfirmReservation;
