import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../services/api";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);

  const submitTicket = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    attachments.forEach((file) => formData.append("attachments", file));

    try {
      await api.post("/tickets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Ticket submitted successfully!");
      setTitle("");
      setDescription("");
      setAttachments([]);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting ticket");
    }
  };

  return (
    <Form onSubmit={submitTicket} className="mb-4 shadow p-3 bg-dark text-light rounded">
      <h4 className="mb-3">Submit New Ticket</h4>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Attachments</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => setAttachments(Array.from(e.target.files))}
        />
        <Form.Text className="text-muted">
          You can upload screenshots or log files to help IT resolve your issue.
        </Form.Text>
      </Form.Group>
      <Button type="submit" variant="primary">
        Submit Ticket
      </Button>
    </Form>
  );
};

export default TicketForm;


