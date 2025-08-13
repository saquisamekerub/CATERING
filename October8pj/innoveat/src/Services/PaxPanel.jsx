import React from "react";
import './PaxPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import wedding from "../assets/wedd.jpg"
import bday from"../assets/bday.jpg"
import debut from "../assets/debut.jpg"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "../NavbarUser/Navbar"



function PaxPanel() {

  const navigate = useNavigate();
  return (
    <>
    <Navbar />
    
    <Container className="pax-panel">
      <h1 className="TITLE_PAX">PAX</h1>

 {/*PAX SLIDE*/}
 {/*ROW 1*/}

      <Row className="justify-content-center mt-5">
        <Col className="d-flex flex-column align-items-center">
          <div className="card50">
            <p className="card50title">50 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn50">SELECT 50</Button>
          </Link>
        </Col>


        <Col className="d-flex flex-column align-items-center">
          <div className="card80">
            <p className="card80title">80 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn80">SELECT 80</Button>
          </Link>
        </Col>


            
        <Col className="d-flex flex-column align-items-center">
          <div className="card100">
            <p className="card100title">100 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn100">SELECT 100</Button>
          </Link>
        </Col>


        <Col className="d-flex flex-column align-items-center">
          <div className="card150">
            <p className="card150title">150 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn150">SELECT 150</Button>
          </Link>
        </Col>
      </Row>


 {/*ROW 2*/}

      <Row>
      <Col className="d-flex flex-column align-items-center">
          <div className="card200">
            <p className="card200title">200 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn200">SELECT 200</Button>
          </Link>
        </Col>


        <Col className="d-flex flex-column align-items-center">
          <div className="card250">
            <p className="card250title">250 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn250">SELECT 250</Button>
          </Link>
        </Col>

        <Col className="d-flex flex-column align-items-center">
          <div className="card300">
            <p className="card300title">300 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn300">SELECT 300</Button>
          </Link>
          </Col>

          <Col className="d-flex flex-column align-items-center">
          <div className="card500">
            <p className="card500title">500 Persons</p>
          </div>
          <Link to ="/Services/Package" >
          <Button className="btn500">SELECT 500</Button>
          </Link>
        </Col>

     
      </Row>


  
      <Button variant="outline-secondary" className="btnBack" onClick={() => navigate(-1)}>
      BACK
      </Button>

    </Container>
    </>

  );
}

export default PaxPanel;
