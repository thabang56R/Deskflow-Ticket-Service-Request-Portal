import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import api from "../services/api";

const EmployeeDashboard = () => {
  const [stats, setStats] = useState({ open: 0, inProgress: 0, resolved: 0 });
  const [animatedStats, setAnimatedStats] = useState({ open: 0, inProgress: 0, resolved: 0 });

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/tickets/stats");
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Animate stats when they change
  useEffect(() => {
    const animate = (key, target) => {
      let start = animatedStats[key];
      const step = target > start ? 1 : -1;
      const interval = setInterval(() => {
        start += step;
        setAnimatedStats((prev) => ({ ...prev, [key]: start }));
        if (start === target) clearInterval(interval);
      }, 50); // speed of animation
    };

    animate("open", stats.open);
    animate("inProgress", stats.inProgress);
    animate("resolved", stats.resolved);
  }, [stats]);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Container fluid className="py-4 bg-dark text-light min-vh-100">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-lg border-0 text-center p-4 bg-secondary text-white">
            <h2 className="fw-bold">Welcome back, Employee-One 👋</h2>
            <p className="mb-0">Your ticket overview and workflow</p>
          </Card>
        </Col>
      </Row>

      {/* Stats Summary with Icons */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 bg-danger text-white">
            <FaClipboardList size={40} className="mb-2" />
            <h5>Open Tickets</h5>
            <h2 className="fw-bold">{animatedStats.open}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 bg-warning text-dark">
            <FaSpinner size={40} className="mb-2" />
            <h5>In Progress</h5>
            <h2 className="fw-bold">{animatedStats.inProgress}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 bg-success text-white">
            <FaCheckCircle size={40} className="mb-2" />
            <h5>Resolved</h5>
            <h2 className="fw-bold">{animatedStats.resolved}</h2>
          </Card>
        </Col>
      </Row>

      {/* Workflow Timeline */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0 p-4 bg-secondary text-light">
            <h4 className="mb-3">📊 Ticket Workflow</h4>
            <ProgressBar>
              <ProgressBar
                animated
                striped
                variant="danger"
                now={animatedStats.open}
                key={1}
                label={`Open (${animatedStats.open})`}
              />
              <ProgressBar
                animated
                striped
                variant="warning"
                now={animatedStats.inProgress}
                key={2}
                label={`In Progress (${animatedStats.inProgress})`}
              />
              <ProgressBar
                animated
                striped
                variant="success"
                now={animatedStats.resolved}
                key={3}
                label={`Resolved (${animatedStats.resolved})`}
              />
            </ProgressBar>
            <p className="mt-3 text-muted">
              Tickets move from <strong>Open</strong> → <strong>In Progress</strong> → <strong>Resolved</strong>.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Refresh Button */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="info" onClick={fetchStats}>
            🔄 Refresh Stats
          </Button>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        <Col md={5}>
          <Card className="shadow-sm border-0 p-3 mb-4 bg-secondary text-light">
            <h4 className="mb-3">📝 Submit New Ticket</h4>
            <TicketForm />
          </Card>
        </Col>
        <Col md={7}>
          <Card className="shadow-sm border-0 p-3 bg-secondary text-light">
            <h4 className="mb-3">📂 My Tickets</h4>
            <TicketList />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;










