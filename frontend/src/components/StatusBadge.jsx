import {
  AlertCircle,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const StatusBar = ({
  open = 0,
  inProgress = 0,
  resolved = 0,
  highPriority = 0,
}) => {
  const stats = [
    {
      title: "Open Tickets",
      value: open,
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Clock3,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.bg} p-3 rounded-full`}
              >
                <Icon className={item.text} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusBar;