import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

interface AppUser {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface CollaborationRequest {
  id: number;
  sender: AppUser;
  receiver: AppUser;
  status: string;
}

const Collaboration: React.FC = () => {
  const email = localStorage.getItem("email") || "";
  const [users, setUsers] = useState<AppUser[]>([]);
  const [incoming, setIncoming] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchUsers();
    fetchIncomingRequests();
  }, []);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      const res = await api.get("/collaboration/users", {
        params: { email },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  /* ---------------- FETCH INCOMING REQUESTS ---------------- */
  const fetchIncomingRequests = async () => {
    try {
      const res = await api.get("/collaboration/incoming", {
        params: { email },
      });
      setIncoming(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch incoming requests");
    }
  };

  /* ---------------- SEND REQUEST ---------------- */
  const sendRequest = async (receiverEmail: string) => {
    setLoading(true);
    try {
      await api.post(
        "/collaboration/send",
        {},
        { params: { senderEmail: email, receiverEmail } }
      );
      toast.success(`Request sent to ${receiverEmail}`);
      fetchIncomingRequests(); // optional refresh
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESPOND REQUEST ---------------- */
  const respondRequest = async (id: number, accept: boolean) => {
    try {
      await api.put(
        `/collaboration/respond/${id}`,
        null,
        { params: { accept } }
      );
      toast.success(`Request ${accept ? "accepted" : "declined"}`);
      fetchIncomingRequests();
    } catch (err) {
      console.error(err);
      toast.error("Failed to respond to request");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 space-y-12">
          {/* Study Buddy Suggestions */}
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Study Buddy Suggestions
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
                >
                  <img
                    src={user.avatarUrl || "/default-avatar.png"}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {user.email}
                  </p>

                  <button
                    onClick={() => sendRequest(user.email)}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition w-full"
                  >
                    {loading ? "Sending..." : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Incoming Requests */}
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Incoming Requests
            </h1>

            {incoming.length === 0 ? (
              <p className="text-gray-500">No incoming requests</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {incoming.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
                  >
                    <img
                      src={req.sender.avatarUrl || "/default-avatar.png"}
                      alt={req.sender.name}
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h2 className="text-xl font-semibold">
                      {req.sender.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                      {req.sender.email}
                    </p>

                    <div className="flex gap-4">
                      <button
                        onClick={() => respondRequest(req.id, true)}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => respondRequest(req.id, false)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Collaboration;
