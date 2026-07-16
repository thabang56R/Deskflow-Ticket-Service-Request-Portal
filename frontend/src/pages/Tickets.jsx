import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../components/TicketCard";

const API_URL = "http://localhost:5000/api/tickets";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(res.data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (ticket) => {
    console.log("View", ticket);
  };

  const handleEdit = (ticket) => {
    console.log("Edit", ticket);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">
        Loading tickets...
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">No Tickets Found</h2>
        <p className="text-gray-500 mt-2">
          Create your first support ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Tickets;