import React, { useState, useEffect } from "react";
import './Events.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import wedding from "../assets/wedd.jpg";
import bday from "../assets/bday.jpg";
import debut from "../assets/debut.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../NavbarUser/Navbar";
import axios from 'axios';

function Event() {
  const [paxQty, setPaxQty] = useState("");
  const [eventType, setEventType] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert('User is not logged in. Please login first.');
      navigate('/login');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user_id') {
        setUserId(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSelectEvent = async () => {
    if (!eventType || paxQty === "") {
      alert('Please select both the event type and quantity.');
      return;
    }

    const payload = {
      event_type: eventType,
      pax_qty: paxQty,
      user_id: userId,
    };

    console.log("Payload to send:", payload);

    try {
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/event.php', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.status === 'success') {
        const event_id = response.data.event_id;
        navigate('/Services/Package', {
          state: {
            event_id: event_id,
            user_id: userId,
            pax_qty: paxQty,
          },
        });
      } else {
        alert('Failed to create event: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event.');
    }
  };

  const handlePaxChange = (e) => {
    setPaxQty(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSelectEvent(); // Call the function to create event
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="main-container">
          <h1 className="TITLE_EVENTS">EVENTS</h1>

          {/* Image Gallery */}
          <div className="image-galleryies">
            <img src={wedding} alt="Wedding" className="gallery-image" />
            <img src={bday} alt="Birthday" className="gallery-image" />
            <img src={debut} alt="Debut" className="gallery-image" />
          </div>

          {/* Event Labels */}
          <Row>
            <Col><p className="Title-Wedding">Wedding</p></Col>
            <Col><p className="Title-Birthday">Birthday</p></Col>
            <Col><p className="Title-Debut">Debut</p></Col>
          </Row>

          {/* Dropdowns */}
          <Row className="mt-4 d-flex justify-content-center">
            <Col xs="auto">
              <select
                className="form-selects mt-2"
                value={paxQty}
                onChange={handlePaxChange}
              >
                <option value="" disabled>Select Quantity</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
              </select>
            </Col>

            <Col xs="auto">
              <select
                className="form-selects mt-2"
                value={eventType}
                onChange={handleEventTypeChange}
              >
                <option value="" disabled>Select Event</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Debut">Debut</option>
              </select>
            </Col>
          </Row>

          {/* Submit Button */}
          <button onClick={handleSubmit} className="btn btn-info mt-4">
            Create Event
          </button>
        </div>
      </Container>
    </>
  );
}

export default Event;
