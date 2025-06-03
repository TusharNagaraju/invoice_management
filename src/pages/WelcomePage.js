// src/pages/WelcomePage.js
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4306/4306906.png"
            alt="Welcome"
            style={{ maxWidth: '200px', marginBottom: '20px' }}
          />
          <h2 className="mb-3">Welcome to Invoify</h2>
          <p className="lead mb-4">
            Invoify is an Automatic Invoice Generator platform designed to create and manage invoices efficiently for businesses and individuals.
          </p>
          <Button variant="primary" as={Link} to="/home">
            Start
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;

