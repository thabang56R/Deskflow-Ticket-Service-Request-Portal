import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent. Thank you!");
    setMessage("");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4">Contact Us</h2>
      <Card className="bg-dark text-light shadow p-3">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question or feedback here..."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Send</Button>
          </Form>
          <div className="mt-4">
            <p>
              You can also reach us at <strong>support@deskflow.com</strong> or call
              <strong> +27 11 123 4567</strong>.
            </p>
            <p className="mb-0">Created by <strong>Thabang Rakeng</strong></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;

