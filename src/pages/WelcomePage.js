// src/pages/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header className="d-flex justify-content-start align-items-center py-4 px-5">
        <h1 className="fs-4 fw-bold text-primary mb-0">
          <i className="bi bi-bookmark-fill me-2"></i> Invoify
        </h1>
      </header>

      {/* Main Section */}
      <div className="row flex-grow-1 align-items-center px-5">
        {/* Left Column */}
        <div className="col-md-6">
          <h2 className="display-5 fw-bold mb-4">A Simple Invoice Manager</h2>
          <p className="lead text-secondary mb-4">
            Invoify is an Automatic Invoice Generator platform designed to create and manage invoices efficiently for businesses and individuals.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="btn btn-primary btn-lg px-4"
          >
            Start
          </button>
        </div>

        {/* Right Column - Illustration */}
        <div className="col-md-6 d-none d-md-block text-center">
          <svg
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
            className="img-fluid"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              fill="#0d6efd"
              opacity="0.3"
            />
            <rect x="50" y="100" rx="15" ry="15" width="400" height="250" fill="#0d6efd" />
            <rect x="90" y="140" rx="10" ry="10" width="320" height="30" fill="#fff" />
            <rect x="90" y="180" rx="10" ry="10" width="260" height="30" fill="#fff" opacity="0.9" />
            <rect x="90" y="220" rx="10" ry="10" width="180" height="30" fill="#fff" opacity="0.9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;


