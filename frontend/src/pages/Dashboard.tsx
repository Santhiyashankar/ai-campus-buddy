import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import api from "../services/api"; // <-- Axios instance

interface Task {
  id: number;
  title: string;
  completed: boolean;
  deadline: string;
}

interface Stats {
  totalTasks: number;
  completedTasks: number;
  streak: number;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    streak: 0,
  });
  const [aiTip, setAiTip] = useState<string>(""); // AI Tip state

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // Fetch tasks
  useEffect(() => {
    if (!token || !email) return;

    api
      .get(`/tasks/${email}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Tasks fetch error:", err));
  }, [token, email]);

  // Fetch stats
  useEffect(() => {
    if (!token || !email) return;

    api
      .get(`/stats/${email}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, [token, email]);

  // Fetch AI Tip
  useEffect(() => {
    if (!token || !email) return;

    api
      .get(`/ai/tip/${email}`)
      .then((res) => setAiTip(res.data.tip)) // backend returns { tip: "..." }
      .catch((err) => console.error("AI tip fetch error:", err));
  }, [token, email]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Today's Tasks"
              value={stats.totalTasks}
              icon="📋"
              bgColor="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
            <StatCard
              title="Completed"
              value={stats.completedTasks}
              icon="✅"
              bgColor="bg-gradient-to-r from-green-400 to-teal-500"
            />
            <StatCard
              title="Streak"
              value={`🔥 ${stats.streak} days`}
              icon="🔥"
              bgColor="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
            />
          </div>

          {/* Tasks Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Your Tasks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.length ? (
                tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                    deadline={task.deadline}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  No tasks available. Add your tasks to get started!
                </p>
              )}
            </div>
          </section>

          {/* AI Tip */}
          {aiTip && (
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              💡 <b>AI Tip:</b> {aiTip}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
