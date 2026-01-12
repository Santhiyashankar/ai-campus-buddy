import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../services/api"; // axios with baseURL: http://localhost:8080/req
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  completed: boolean;
  priority: number;
}

export default function Tasks() {
  const email = localStorage.getItem("email") || "";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(2);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (!email) return;
    try {
      const res = await api.get(`/tasks/${email}`);
      setTasks(res.data || []);
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      alert("Failed to fetch tasks: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!title || !deadline) return alert("Title & deadline are required");
    setLoading(true);

    try {
      // Format deadline same as Postman: YYYY-MM-DDTHH:mm:ss
      const taskPayload = {
        title,
        description,
        deadline: deadline + "T23:59:00",
        priority,
        user: { email },
      };

      console.log("Adding task:", taskPayload);

      const res = await api.post("/tasks", taskPayload);

      console.log("Task added:", res.data);

      // Update state immediately
      setTasks((prev) => [...prev, res.data]);

      // Reset form
      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority(2);
    } catch (err: any) {
      console.error("Error adding task:", err);
      alert("Failed to add task: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  // Toggle task complete
  const toggleComplete = async (id: number) => {
    try {
      const res = await api.put(`/tasks/${id}/complete`);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err: any) {
      console.error(err);
      alert("Failed to toggle task");
    }
  };

  const priorityColor = (p: number) =>
    p === 1 ? "bg-red-500" : p === 2 ? "bg-yellow-400 text-gray-900" : "bg-green-500";

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 space-y-8">
          {/* Add Task Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>High Priority</option>
              <option value={2}>Medium Priority</option>
              <option value={3}>Low Priority</option>
            </select>
            <button
              onClick={addTask}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length === 0 && (
              <p className="text-gray-500 col-span-full text-center mt-4">No tasks yet</p>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between ${
                  task.completed ? "opacity-80" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3
                    className={`font-bold text-lg wrap-break-word ${
                      task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white font-semibold ${priorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority === 1
                      ? "High"
                      : task.priority === 2
                      ? "Medium"
                      : "Low"}
                  </span>
                </div>

                {task.description && (
                  <p
                    className={`mt-2 text-gray-600 text-sm ${
                      task.completed ? "line-through italic" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                <p className="mt-3 text-xs text-gray-500">
                  Deadline: {format(new Date(task.deadline), "dd MMM yyyy")}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                      task.completed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {task.completed ? "Completed ✅" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 rounded-lg font-medium text-sm bg-red-500 hover:bg-red-600 text-white transition"
                  >
                    Delete 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
