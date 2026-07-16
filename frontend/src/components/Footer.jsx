import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-4 mt-5 shadow-lg ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ borderTop: `3px solid ${darkMode ? "#0d6efd" : "#6610f2"}` }}
    >
      <Container className="text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} DeskFlow was proudly created by <strong>Thabang Rakeng</strong>.
        </p>
        <div>
          <a href="/help" className={darkMode ? "text-light mx-2" : "text-dark mx-2"}>Help</a>|
          <a href="/privacy" className={darkMode ? "text-light mx-2" : "text-dark mx-2"}>Privacy Policy</a>|
          <a href="/contact" className={darkMode ? "text-light mx-2" : "text-dark mx-2"}>Contact</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
