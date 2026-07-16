import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import api from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get("/tickets/my"); // ✅ no extra /api
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

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
            <td>{ticket.priority}</td>
            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketList;






