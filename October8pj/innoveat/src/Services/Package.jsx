import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Package.css';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import wedding from "../assets/wedd.jpg";
import bday from "../assets/bday.jpg";
import debut from "../assets/debut.jpg";
import binyag from "../assets/christening.jpg";
import Navbar from "../NavbarUser/Navbar";
import axios from 'axios';

function Package() {
  const packages = [
    { name: 'Basic Package', image: wedding, inclusion: ['Set up', 'Sounds and Light'] },
    { name: 'Bronze Package', image: bday, inclusion: ['Set up', 'Sounds and Light', 'Food Catering'] },
    { name: 'Silver Package', image: debut, inclusion: ['Set up', 'Sounds and Light', 'Food Catering', 'Venue Decoration'] },
    { name: 'Grand Package', image: binyag, inclusion: ['Set up', 'Sounds and Light', 'Food Catering', 'Venue Decoration', 'Photo and Video Coverage'] },
    { name: 'Custom Package', image: binyag, inclusion: ['Customizable based on client’s needs'] }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { event_id, user_id, pax_qty } = location.state || {};

  useEffect(() => {
    if (!event_id) {
      alert('No event_id found! Redirecting...');
      navigate('/'); // Redirect if event_id is missing
    }
  }, [event_id, navigate]);

  const handleShowModal = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const createPayload = (pkg) => {
    return {
      package_type: pkg.name, // Set the package type here
      pax_qty: pax_qty,
      user_id: user_id,
      event_id: event_id,
    };
  };

  const handleSelectPackage = async () => {
    if (selectedPackage) {
      const payload = createPayload(selectedPackage);
  
      try {
        const response = await axios.post('http://localhost/Integ_Prog_DBCon/package.php', payload, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.data.status === 'success') {
          const package_id = response.data.package_id; // Ensure this value is returned from your backend
          alert('Package selected successfully!');

          // Navigate to Foodpackage with selected package and event ID
          navigate('/Services/Foodpackage', {
            state: {
              selectedPackage: {
                name: selectedPackage.name,
                pax_qty: payload.pax_qty,
                user_id: payload.user_id,
                event_id: payload.event_id,
                package_id: package_id,
                inclusion: selectedPackage.inclusion,
              },
            },
          });
        } else {
          alert('Failed to select package: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error selecting package:', error);
        alert('An error occurred while selecting the package.');
      }
      handleCloseModal();
    }
  };

  const handleButtonClick = (pkg) => {
    if (pkg.name === 'CustomPackage') {
      navigate('/Services/CustomPackage'); // Navigate to Custom Package
    } else {
      handleShowModal(pkg); // Show modal for other packages
    }
  };

  return (
    <>
      <Navbar />
      <div className="packages-container mt-4">
        <h1 className="page-title">PACKAGE</h1>
        <div className="package-list">
          {packages.map((pkg, index) => (
            <div key={index} className="package-cards">
              <img src={pkg.image} alt={pkg.name} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title">{pkg.name}</h2>
                <button 
                  className="view-button" 
                  onClick={() => {
                    if (pkg.name === 'Custom Package') {
                      navigate('/Services/CustomPackage'); // Navigate to Custom Package
                    } else {
                      handleShowModal(pkg); // Show modal for other packages
                    }
                  }}
                >
                  {pkg.name === 'Custom Package' ? 'SELECT' : 'VIEW'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedPackage?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>INCLUSION</h5>
            <ul>
              {selectedPackage?.inclusion.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>CLOSE</Button>
            <Button variant="success" onClick={handleSelectPackage}>SELECT</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Package;