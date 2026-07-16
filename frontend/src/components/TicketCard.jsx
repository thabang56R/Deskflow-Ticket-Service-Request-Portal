import {
  Calendar,
  User,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const priorityColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
};

const statusColors = {
  Open: "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-700",
};

const TicketCard = ({
  ticket,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300">
      {/* Header */}
      <div className="p-5 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {ticket.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              #{ticket._id?.slice(-6)}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              priorityColors[ticket.priority] ||
              priorityColors.Medium
            }`}
          >
            {ticket.priority}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-gray-600 line-clamp-3">
          {ticket.description}
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertTriangle size={16} />
            <span>{ticket.category}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} />
            <span>
              {ticket.assignedTo?.name || "Unassigned"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>{ticket.status}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 py-4 bg-gray-50 rounded-b-2xl">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[ticket.status] ||
            statusColors.Open
          }`}
        >
          {ticket.status}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onView(ticket)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
            title="View Ticket"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(ticket)}
            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
            title="Edit Ticket"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onDelete(ticket._id)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
            title="Delete Ticket"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;