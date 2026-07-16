import React, { useEffect, useState } from "react";
import { Table, Form, Badge } from "react-bootstrap";
import api from "../services/api";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets").then((res) => setTickets(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/tickets/${id}`, { status });
    setTickets((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status } : t))
    );
  };

  const statusColor = (status) => {
    switch (status) {
      case "Open": return "danger";
      case "In Progress": return "warning";
      case "Resolved": return "success";
      default: return "secondary";
    }
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.user?.name || "N/A"}</td>
              <td><Badge bg={statusColor(ticket.status)}>{ticket.status}</Badge></td>
              <td>{ticket.priority}</td>
              <td>
                <Form.Select
                  value={ticket.status}
                  onChange={(e) => updateStatus(ticket._id, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;


