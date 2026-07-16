import React from "react";
import { Container, Card } from "react-bootstrap";

const Help = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4">Help & FAQ</h2>

      <Card className="mb-3 bg-dark text-light shadow">
        <Card.Body>
          <Card.Title>How do I submit a ticket?</Card.Title>
          <Card.Text>
            Go to the Employee Dashboard and fill out the ticket form. Add a title,
            description, and optional attachments like screenshots or logs. Then click
            “Submit Ticket.”
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-3 bg-dark text-light shadow">
        <Card.Body>
          <Card.Title>How do I track my ticket?</Card.Title>
          <Card.Text>
            Your submitted tickets appear in the Employee Dashboard. Each ticket shows
            its current status (Open, In Progress, Resolved).
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-3 bg-dark text-light shadow">
        <Card.Body>
          <Card.Title>How do admins update tickets?</Card.Title>
          <Card.Text>
            Admins can view all tickets in the Admin Dashboard. They can instantly
            update statuses using the dropdown menu in the ticket table.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-3 bg-dark text-light shadow">
        <Card.Body>
          <Card.Title>Need more help?</Card.Title>
          <Card.Text>
            Contact IT support at <strong>support@deskflow.com</strong> or call
            <strong> +27 11 123 4567</strong>. 
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Help;
