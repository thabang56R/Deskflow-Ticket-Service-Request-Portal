import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import api from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // ✅ Admin route: fetch all tickets
        const { data } = await api.get("/tickets");
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  // ✅ Handle priority change
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

  // ✅ Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.put(`/tickets/${id}/status`, { status: newStatus });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: data.status } : t))
      );
    } catch (err) {
      console.error("Error updating status:", err);
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
            <td>
              {/* ✅ Admin can now change status */}
              <Form.Select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </Form.Select>
            </td>
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




