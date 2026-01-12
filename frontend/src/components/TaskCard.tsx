
interface TaskCardProps {
  title: string;
  completed: boolean;
  deadline?: string;
  className?: string;
}

export default function TaskCard({ title, completed, deadline, className }: TaskCardProps) {
  return (
    <div
      className={`p-5 bg-white rounded-2xl shadow-md hover:shadow-xl border-l-4 ${
        completed ? "border-green-500" : "border-indigo-500"
      } transition ${className}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className={`text-lg font-semibold ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {title}
        </h4>
        <span
          className={`px-2 py-1 text-sm rounded-full font-medium ${
            completed ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>
      {deadline && <p className="text-gray-500 text-sm">Deadline: {deadline}</p>}
    </div>
  );
}
