import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import api from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get("/tickets"); // admin route
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  const handlePriorityChange = async (id, newPriority) => {
    try {
      const { data } = await api.put(`/tickets/${id}/priority`, { priority: newPriority });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, priority: data.priority } : t))
      );
    } catch (err) {
      console.error("Error updating priority:", err);
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{ticket.title}</td>
            <td>{ticket.description}</td>
            <td>{ticket.status}</td>
            <td>
              <Form.Select
                value={ticket.priority}
                onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Form.Select>
            </td>
            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketList;



