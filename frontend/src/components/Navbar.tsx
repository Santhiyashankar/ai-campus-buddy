import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove only relevant user data
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600">
        AI Campus Buddy
      </h1>
      
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 shadow-sm"
      >
        Logout
      </button>
    </header>
  );
}
