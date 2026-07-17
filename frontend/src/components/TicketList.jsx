import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import api from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // ✅ Decode user role from localStorage or JWT payload
        const user = JSON.parse(localStorage.getItem("user")); 
        const adminFlag = user?.isAdmin || false;
        setIsAdmin(adminFlag);

        // ✅ Employees → /tickets/my | Admins → /tickets
        const endpoint = adminFlag ? "/tickets" : "/tickets/my";
        const { data } = await api.get(endpoint);
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  // ✅ Handle priority change (admins only)
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

  // ✅ Priority color coding
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Low":
        return { color: "green", fontWeight: "bold" };
      case "Medium":
        return { color: "orange", fontWeight: "bold" };
      case "High":
        return { color: "red", fontWeight: "bold" };
      case "Critical":
        return { color: "purple", fontWeight: "bold" };
      default:
        return {};
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
              {isAdmin ? (
                <Form.Select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}
                  style={getPriorityStyle(ticket.priority)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </Form.Select>
              ) : (
                <span style={getPriorityStyle(ticket.priority)}>{ticket.priority}</span>
              )}
            </td>
            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketList;








