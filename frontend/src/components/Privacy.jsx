import React from "react";
import { Container, Card } from "react-bootstrap";

const Privacy = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4">Privacy Policy</h2>
      <Card className="bg-dark text-light shadow p-3">
        <Card.Body>
          <Card.Text>
            DeskFlow respects your privacy. We only collect information necessary
            to manage IT tickets and improve support services. Your data is stored
            securely and never shared with third parties without consent.
          </Card.Text>
          <Card.Text>
            By using DeskFlow, you agree to the collection and use of information
            in accordance with this policy. For questions, contact us at
            <strong> privacy@deskflow.com</strong>.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Privacy;

