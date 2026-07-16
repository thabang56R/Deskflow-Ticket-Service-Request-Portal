import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import api from "../services/api";
import { useTheme } from "../ThemeContext";

const Profile = ({ user, setUser }) => {
  const { darkMode } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/profile", { name, email, password });
      setUser(res.data);
      alert("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className={darkMode ? "text-light mb-4" : "text-dark mb-4"}>My Profile</h2>
      <Card className={darkMode ? "bg-dark text-light shadow p-3" : "bg-light text-dark shadow p-3"}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </Form.Group>
            <Button type="submit" variant={darkMode ? "outline-light" : "outline-dark"}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
