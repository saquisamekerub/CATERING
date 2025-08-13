import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EventForm.css";
import Navbar from "../NavbarUser/Navbar";

function EventForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve event_id from location.state or localStorage, with state taking priority
  const stateEventId = location.state?.event_id;
  const [event_id, setEventId] = useState(stateEventId || localStorage.getItem("event_id") || null);
  const [UserId, setUserId] = useState(localStorage.getItem('user_id'));
  const [formData, setFormData] = useState({
    eventDate: "", // Event date
    venueLocation: "", // Event location
    startTime: "", // Event start time
    endTime: "", // Event end time
  });

  useEffect(() => {
    // Check if event_id is set, if not, try to retrieve from localStorage
    if (!event_id) {
      const storedEventId = localStorage.getItem("event_id");
      if (storedEventId) {
        setEventId(storedEventId); // Update event_id from localStorage
      } else {
        alert("Event ID not found. Please return to the previous page and select an event.");
        navigate(-1); // Go back if no event_id is found
      }
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(storedUserId); // Set user_id if it exists in localStorage
      } else {
        alert('User is not logged in. Please login first.');
        navigate('/login'); // Redirect to login page if user_id is not found
      }
    } else {
      // Ensure that the event_id is saved in localStorage if retrieved from location.state
      localStorage.setItem("event_id", event_id);
    }
  }, [event_id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      user_id: UserId,
      event_id,
      event_date: formData.eventDate,
      location: formData.venueLocation,
      start_time: formData.startTime,
      end_time: formData.endTime,
    };

    try {
      const response = await fetch("http://localhost/Integ_Prog_DBCon/eventform.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "Success") {
        const event_id = data.event_id; // Capture event_id from the backend response

        // Store event_id and form data in localStorage
        localStorage.setItem("eventData", JSON.stringify({ ...formData, event_id }));

        alert("Form submitted successfully!");
        // Pass formData and event_id to the next page
        navigate("/Services/ConfirmReservation", { state: { formData, event_id } });
      } else {
        alert("Failed to submit form: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleCancel = () => {
    navigate("/Services");
  };

  const handleBack = () => {
    navigate("/Services");
  };

  return (
    <>
      <Navbar />
      <div className="contact-form-container">
  <div className="form-body">
    <h1 className="form-title">Event Form</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-row mb-3">
        <label htmlFor="eventDate" className="form-label">Event Date</label>
        <input
          type="date"
          name="eventDate"
          id="eventDate"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row mb-3">
        <label htmlFor="venueLocation" className="form-label">Event Location</label>
        <input
          type="text"
          name="venueLocation"
          id="venueLocation"
          placeholder="Venue Location"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row mb-3">
        <label htmlFor="startTime" className="form-label">Event Start Time</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row mb-3">
        <label htmlFor="endTime" className="form-label">Event End Time</label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="button-row">
        <button type="button" class Name="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-info">
          Continue
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}

export default EventForm;
