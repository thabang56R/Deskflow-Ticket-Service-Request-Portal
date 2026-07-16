import {
  Eye,
  Pencil,
  Trash2,
  User,
  Calendar,
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
  Closed: "bg-gray-200 text-gray-700",
};

const TicketTable = ({
  tickets = [],
  onView,
  onEdit,
  onDelete,
}) => {
  if (!tickets.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Tickets Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first ticket to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Ticket</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Assigned To</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {ticket.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5">
                  {ticket.category}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      priorityColors[ticket.priority] ||
                      priorityColors.Medium
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[ticket.status] ||
                      statusColors.Open
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <User size={16} />

                    <span>
                      {ticket.assignedTo?.name || "Unassigned"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />

                    <span>
                      {new Date(
                        ticket.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(ticket)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(ticket)}
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(ticket._id)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;