import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Portfolio.css'; // Import custom CSS for styling
import binyag from "../assets/christening.jpg";
import wedding from "../assets/wedd.jpg"
import bday from "../assets/bday.jpg"
import debut from "../assets/debut.jpg"
import Navbar from "../NavbarUser/Navbar"
 
const Portfolio = () => {
  const portfolioItems = [
    { image: wedding, altText: 'Wedding Image 1' },
    { image: bday, altText: 'Celebration Image' },
    { image: debut, altText: 'Debut Image' },
    { image: binyag, altText: 'Christening Image' }, // Updated alt text for clarity
    { image: wedding, altText: 'Wedding Image 2' }, // Updated alt text for clarity
    { image: debut, altText: 'Debut Image 2' } // Updated alt text for clarity
  ];
 
  
  return (
    <>
     <Navbar />
    <div className="container text-center mt-5">
 
      <h2 className="my-4">PORTFOLIO</h2>
 
      <div className="portfolio-container">
        <div className="row">
          {portfolioItems.map((item, index) => (
            <div className="col-6 col-md-4 mb-4" key={index}>
              <img src={item.image} className="portfolio-image" alt={item.altText} /> {/* Corrected here */}
            </div>
          ))}
        </div>
      </div>
 
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary">BACK</button>
      </div>
    </div>
    </>
  );
};
 
export default Portfolio;
