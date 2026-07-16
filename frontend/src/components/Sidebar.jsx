import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  UserCircle,
  Settings,
  BarChart3,
  ClipboardList,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const employeeLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "My Tickets",
      icon: <Ticket size={20} />,
      path: "/tickets",
    },
    {
      name: "Create Ticket",
      icon: <PlusCircle size={20} />,
      path: "/tickets/create",
    },
    {
      name: "Profile",
      icon: <UserCircle size={20} />,
      path: "/profile",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Manage Tickets",
      icon: <ClipboardList size={20} />,
      path: "/tickets",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/users",
    },
    {
      name: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
    {
      name: "Profile",
      icon: <UserCircle size={20} />,
      path: "/profile",
    },
  ];

  const links = user?.role === "admin" ? adminLinks : employeeLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-72 bg-slate-900 text-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">
              DeskFlow
            </h1>

            <p className="text-sm text-slate-400">
              Ticket Management
            </p>
          </div>

          <button
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* User */}
        <div className="p-6 border-b border-slate-700">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <h3 className="mt-3 font-semibold">
            {user?.name || "Administrator"}
          </h3>

          <p className="text-slate-400 capitalize">
            {user?.role || "Admin"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-4">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-300">
              DeskFlow Enterprise
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;