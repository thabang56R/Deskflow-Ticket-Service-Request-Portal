import React from "react";
import { Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Landing = () => {
  const { darkMode } = useTheme();

  // Smooth scroll handler
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Inline CSS */}
      <style>
        {`
          html { scroll-behavior: smooth; }
          .fade-in { opacity: 0; transform: translateY(20px); animation: fadeInUp 1s ease forwards; }
          .fade-in-delay { opacity: 0; transform: translateY(20px); animation: fadeInUp 1.2s ease forwards; }
          @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
          .glow-text { text-shadow: 0 0 15px rgba(13, 110, 253, 0.7); }
          .pulse-button { animation: pulse 2s infinite; }
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(13, 110, 253, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(13, 110, 253, 0.7); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(13, 110, 253, 0.7); }
          }
          .hero-img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.3); animation: fadeInUp 1.5s ease forwards; }
          .landing-section { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 2rem; }
          @media (min-width: 992px) { .landing-section { flex-wrap: nowrap; } }
          .floating-navbar { position: fixed; top: 0; width: 100%; z-index: 1000; backdrop-filter: blur(10px); transition: background-color 0.3s ease; }
          .nav-link { font-weight: 500; transition: color 0.3s ease; cursor: pointer; }
          .nav-link:hover { color: #0d6efd !important; }
          section { padding: 100px 0; }
        `}
      </style>

      {/* Floating Navbar */}
      <Navbar
        expand="lg"
        className="floating-navbar py-3"
        style={{
          backgroundColor: darkMode
            ? "rgba(33, 37, 41, 0.85)"
            : "rgba(248, 249, 250, 0.85)",
        }}
        variant={darkMode ? "dark" : "light"}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className={`fw-bold ${darkMode ? "text-light" : "text-dark"}`}>
            DeskFlow
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={(e) => handleScroll(e, "home")}>Home</Nav.Link>
              <Nav.Link onClick={(e) => handleScroll(e, "about")}>About</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link onClick={(e) => handleScroll(e, "contact")}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div
        id="home"
        className="d-flex align-items-center fade-in"
        style={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #212529, #0d6efd)"
            : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          color: darkMode ? "#f8f9fa" : "#212529",
          paddingTop: "80px",
        }}
      >
        <Container>
          <Row className="landing-section text-center text-lg-start">
            {/* Left: Hero Illustration */}
            <Col lg={6} className="fade-in">
              <img
                src="https://copilot.microsoft.com/th/id/BCO.4ef73946-dba5-4c14-9ec3-2a20ec1ea09f.png"
                alt="DeskFlow Hero Illustration"
                className="hero-img"
              />
            </Col>
            {/* Right: Text Content */}
            <Col lg={6} className="fade-in-delay">
              <h1 className={`fw-bold display-2 mb-3 glow-text ${darkMode ? "text-light" : "text-dark"}`}>
                DeskFlow
              </h1>
              <p className={`lead mb-4 ${darkMode ? "text-secondary" : "text-muted"}`}>
                A modern, secure, and responsive internal ticketing system designed for fast issue resolution and seamless collaboration.
              </p>
              <p className={`mb-4 ${darkMode ? "text-light" : "text-dark"}`}>
                Empower your workforce with role‑based dashboards, real‑time updates, and analytics that keep IT operations running smoothly.
              </p>
              <Button
                as={Link}
                to="/login"
                variant={darkMode ? "outline-light" : "outline-dark"}
                size="lg"
                className="shadow-lg px-5 py-2 pulse-button"
              >
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Section */}
      <section id="about">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">About DeskFlow</h2>
          <p className="lead mb-4">
            DeskFlow is more than just a ticketing system — it’s a complete IT support solution built for modern organizations.
          </p>
          <Row>
            <Col md={4}>
              <h5 className="fw-bold">🔒 Secure & Reliable</h5>
              <p>Enterprise‑grade authentication, encrypted data storage, and role‑based access ensure your information stays safe.</p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">⚡ Real‑Time Collaboration</h5>
              <p>Employees and admins work together seamlessly with instant notifications, live updates, and integrated messaging.</p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">📊 Analytics & Insights</h5>
              <p>Track ticket trends, resolution times, and team performance with powerful dashboards and reporting tools.</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <h5 className="fw-bold">🌐 Responsive Design</h5>
              <p>DeskFlow adapts to any device — desktop, tablet, or mobile — so support is always at your fingertips.</p>
            </Col>
            <Col md={6}>
              <h5 className="fw-bold">🤝 Employee Empowerment</h5>
              <p>Role‑based dashboards give employees clarity on their tickets while admins gain full control over workflows.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Contact Us</h2>
          <p className="lead">
            Have questions? Reach out to our support team at{" "}
            <a href="mailto:support@deskflow.com">support@deskflow.com</a>.
          </p>
        </Container>
      </section>
    </>
  );
};

export default Landing;







