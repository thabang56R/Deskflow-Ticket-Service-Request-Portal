import React, { useEffect, useState } from "react";
import { Table, Form, Card } from "react-bootstrap";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import api from "../services/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); 
        const adminFlag = user?.isAdmin || false;
        setIsAdmin(adminFlag);

        // ✅ Employees → /tickets/my | Admins → /tickets
        const endpoint = adminFlag ? "/tickets" : "/tickets/my";
        const { data } = await api.get(endpoint);
        setTickets(data);

        // ✅ Employees → /tickets/stats | Admins → /tickets/stats/all
        const statsEndpoint = adminFlag ? "/tickets/stats/all" : "/tickets/stats";
        const { data: statsData } = await api.get(statsEndpoint);
        setStats(statsData);

        // ✅ Trend data (both employees and admins use /tickets/stats/trend)
        const { data: trendStats } = await api.get("/tickets/stats/trend");
        setTrendData(trendStats);
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

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Low": return { color: "green", fontWeight: "bold" };
      case "Medium": return { color: "orange", fontWeight: "bold" };
      case "High": return { color: "red", fontWeight: "bold" };
      case "Critical": return { color: "purple", fontWeight: "bold" };
      default: return {};
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open": return { color: "red", fontWeight: "bold" };
      case "In Progress": return { color: "orange", fontWeight: "bold" };
      case "Resolved": return { color: "green", fontWeight: "bold" };
      case "Closed": return { color: "gray", fontWeight: "bold" };
      default: return {};
    }
  };

  // ✅ Chart data
  const statusData = {
    labels: ["Open", "In Progress", "Resolved", "Closed"],
    datasets: [
      {
        data: [stats.open, stats.inProgress, stats.resolved, stats.closed],
        backgroundColor: ["red", "orange", "green", "gray"],
      },
    ],
  };

  const priorityData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        data: [stats.low, stats.medium, stats.high, stats.critical],
        backgroundColor: ["green", "orange", "red", "purple"],
      },
    ],
  };

  const lineData = {
    labels: trendData.map((t) => t._id),
    datasets: [
      {
        label: "Tickets Created",
        data: trendData.map((t) => t.count),
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true,
      },
    ],
  };

  return (
    <>
      {/* ✅ Dashboard Summary */}
      <Card className="mb-3 p-3">
        <h5>{isAdmin ? "Global Ticket Summary" : "My Ticket Summary"}</h5>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ width: "300px" }}>
            <h6>Status Distribution</h6>
            <Pie data={statusData} />
          </div>
          <div style={{ width: "300px" }}>
            <h6>Priority Distribution</h6>
            <Bar data={priorityData} />
          </div>
        </div>
        <div style={{ width: "600px", marginTop: "1rem" }}>
          <h6>Ticket Creation Trend</h6>
          <Line data={lineData} />
        </div>
      </Card>

      {/* ✅ Legends */}
      <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <span style={{ color: "red", marginRight: "1rem" }}>● Open</span>
          <span style={{ color: "orange", marginRight: "1rem" }}>● In Progress</span>
          <span style={{ color: "green", marginRight: "1rem" }}>● Resolved</span>
          <span style={{ color: "gray", marginRight: "1rem" }}>● Closed</span>
        </div>
        <div>
          <span style={{ color: "green", marginRight: "1rem" }}>● Low</span>
          <span style={{ color: "orange", marginRight: "1rem" }}>● Medium</span>
          <span style={{ color: "red", marginRight: "1rem" }}>● High</span>
          <span style={{ color: "purple", marginRight: "1rem" }}>● Critical</span>
        </div>
      </div>

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
                {isAdmin ? (
                  <Form.Select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    style={getStatusStyle(ticket.status)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                ) : (
                  <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
                )}
              </td>
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
    </>
  );
};

export default TicketList;

















