import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import api from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Employee route
        const { data: ticketData } = await api.get("/tickets/my");
        setTickets(Array.isArray(ticketData) ? ticketData : []);

        // ✅ Stats route returns an object, not an array
        const { data: statsData } = await api.get("/tickets/stats");
        setStats(statsData || {});
      } catch (err) {
        console.error("Error fetching data:", err);
        setTickets([]);
        setStats({});
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* ✅ Stats summary */}
      <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>
        <span style={{ color: "red", marginRight: "1rem" }}>Open: {stats.open}</span>
        <span style={{ color: "orange", marginRight: "1rem" }}>In Progress: {stats.inProgress}</span>
        <span style={{ color: "green", marginRight: "1rem" }}>Resolved: {stats.resolved}</span>
        <span style={{ color: "gray", marginRight: "1rem" }}>Closed: {stats.closed}</span>
        <span style={{ color: "green", marginRight: "1rem" }}>Low: {stats.low}</span>
        <span style={{ color: "orange", marginRight: "1rem" }}>Medium: {stats.medium}</span>
        <span style={{ color: "red", marginRight: "1rem" }}>High: {stats.high}</span>
        <span style={{ color: "purple", marginRight: "1rem" }}>Critical: {stats.critical}</span>
      </div>

      {/* ✅ Tickets table */}
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
          {Array.isArray(tickets) &&
            tickets.map((ticket) => (
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
    </>
  );
};

export default TicketList;






