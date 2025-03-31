import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactHeader from './components/ContactHeader';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import MapSection from './components/MapSection';
import FAQSection from './components/FAQSection';
import useScrollAnimation from './hooks/useScrollAnimation';
import './styles/Contacto.css';
import Header from "../../../../../components/header/Header.jsx";

const Contacto = () => {
  useScrollAnimation();

  return (
    <div className="contacto-page">
      <Header />
      
      <ContactHeader />

      <Container className="mb-5">
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <ContactInfo />
          </Col>
          <Col lg={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>

      <MapSection />
      <FAQSection />
    </div>
  );
};

export default Contacto;