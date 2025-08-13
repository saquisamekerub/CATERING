import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DownPayment.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavbarUser/Navbar";
 
function DownPayment() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    referenceNumber: "",
    email: ""
  });
  
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
[e.target.name]: e.target.value,
    });
  };
 
  const handleConfirm = () => {
    alert("Down payment confirmed!");
  };
 
  return (
    <>
    <Navbar />
    <div className="downpayment-container">
      <div className="form-body">
        <h2 className="form-title">Down Payment Form</h2>
        <p>Wallet: Gcash</p>
        <p>Name: Lotso Snowball Catering</p>
        <p>Account No.: 09123456789</p>
        <form>
          <input type="text" name="name" placeholder="Name" className="form-control mb-3" onChange={handleChange} />
          <input type="text" name="amount" placeholder="Amount" className="form-control mb-3" onChange={handleChange} />
          <input type="text" name="referenceNumber" placeholder="Reference No." className="form-control mb-3" onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" className="form-control mb-3" onChange={handleChange} />
          <div className="button-row">
            <button type="button" className="btn btn-danger" onClick={() => navigate("/Services")}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={handleConfirm}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
 
export default DownPayment;