import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") ?? "";
  const name = localStorage.getItem("name") ?? "User";

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Tasks", path: "/tasks", icon: "📋" }, // This will navigate to Tasks
    { name: "Collaboration", path: "/collaboration", icon: "🤝" },
    { name: "Gamification", path: "/gamification", icon: "🎯" },
    { name: "Campus Resources", path: "/resources", icon: "🏫" },
    { name: "Profile", path: "/profile", icon: "👤" },
    {name: "Chat", path: "/chat", icon: "💬" },
  ];

  // Generate initials from name
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <aside className="w-72 bg-white shadow-lg min-h-screen p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-600 mb-10">
          AI Campus Buddy
        </h2>

        {/* Menu Items */}
        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-indigo-50 cursor-pointer transition-all duration-300"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: User Info */}
      <div className="mt-10 flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
        <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>

        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500 truncate max-w-40">{email}</p>
        </div>
      </div>
    </aside>
  );
}
