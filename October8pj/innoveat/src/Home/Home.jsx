import React from "react";
import './Home.css'
import wedding from "../assets/wedd.jpg"
import bday from"../assets/bday.jpg"
import debut from "../assets/debut.jpg"
import Navbar from "../NavbarUser/Navbar"

function Home(){
    return(
      <>
      <Navbar />
      <div className="background-image">
       <main className="main-content">
      <h1 className="main-title">INNOVEAT</h1>
      <div className="image-galleryies">
        <img src={ wedding } alt="Wedding" className="gallery-image"/>
        <img src={ bday } alt="Birthday" className="gallery-image"/>
        <img src={ debut } alt="Debut" className="gallery-image"/>
      </div>
      <div className="description">
        <p>
        INNOVEAT is an innovative catering and party requirements supplying company that focuses its services in providing real culinary experiences in various events. 
        Whether it’s for a small party, a business event or a large celebration, INNOVEAT offers a vast selection of appetising and well-cooked dishes depending with the occasion. 
        Besides providing quality catering services, INNOVEAT provides additional party requisites, which makes the party extraordinary and enjoyable for customers. 
        With passion on quality, creativity and customer recropping every event innovat touches transforms to be an unforgettable one.
        </p>
      </div>
    </main>
    </div>
    </>
);
};

export default Home;