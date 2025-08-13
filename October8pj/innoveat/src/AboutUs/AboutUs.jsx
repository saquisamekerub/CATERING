import React from "react";
import wedding from "../AboutUs/wedd.jpg"
import bday from"../AboutUs/bday.jpg"
import debut from "../AboutUs/debut.jpg"
import "./AboutUs.css"
import Navbar from "../NavbarUser/Navbar"

function AboutUs(){
    return(
        <>  
        <Navbar />
        <div className="about-container">
          <div  className="abouttext">
          <p>About Us</p>
          </div>
        <div className="content-container">
          <div className="image-gallery">
          <img src={ wedding } alt="Wedding" />
          <img src={ bday } alt="Celebration" />
          <img src={ debut } alt="Event" />
        </div>

        <div className="about-section">
          <p>
          At Innoveat Catering and Party Needs, we specialize in bringing every celebration to life with a seamless blend of delicious catering and stylish party essentials. Our mission is simple: to create memorable experiences that bring joy to every guest and ease to every host. We understand the unique needs of each event, from intimate gatherings to grand celebrations, and we work closely with our clients to make every detail perfect.
     
          <div className="parspace"></div>

Our catering services feature a diverse menu crafted with fresh, high-quality ingredients that cater to all tastes and dietary preferences. Whether you're hosting a wedding, corporate event, birthday, or casual get-together, our culinary team is dedicated to delivering both flavor and presentation that impresses.

<div className="parspace"></div>

Alongside our catering services, we provide a wide range of party essentials, including decor, table settings, entertainment, and custom packages to suit your theme and vision. Our team takes pride in offering personalized service, ensuring each event is uniquely tailored to your desires.

<div className="parspace"></div>

With Innoveat Catering and Party Needs, you can relax, knowing that every aspect of your event is in expert hands, allowing you to enjoy the moment with your loved ones. Let us make your next celebration unforgettable!
          

            <div className="facebook">
          <a href="https://www.facebook.com/profile.php?id=61560421475855" target="_blank" rel="noopener noreferrer">
             Kyle & Kerub Catering Services
             </a>
          </div>
  
          <div className="gmail">
             <a href="https://mail.google.com/mail/u/0/?hl=en-GB#inbox" target="_blank" rel="noopener noreferrer">
               marfilkerub@gmail.com
                </a>
                </div>
          

          </p>

        </div>
      </div>
    </div>
    </>
  );
};
     
export default AboutUs;