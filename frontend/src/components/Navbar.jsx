import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const DeskNavbar = ({ user, setUser }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="shadow-sm">
      
      <Nav className="ms-auto align-items-center">
        {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
        {user?.role === "employee" && <Nav.Link as={Link} to="/employee">Employee</Nav.Link>}
        {user?.role === "admin" && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
        {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
        {user && (
          <Button variant={darkMode ? "outline-light" : "outline-dark"} size="sm" onClick={() => setUser(null)}>
            Logout
          </Button>
        )}
        <Button
          variant={darkMode ? "outline-light" : "outline-dark"}
          size="sm"
          className="ms-2"
          onClick={toggleTheme}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Nav>
    </Navbar>
  );
};

export default DeskNavbar;




