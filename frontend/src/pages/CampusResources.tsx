import { useEffect, useState } from "react";
import api from "../services/api";
import ResourceCard from "../components/ResourceCard";
import AiHighlight from "../components/AiHighlight";

export default function CampusResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchResources();
  }, [filter]);

  const fetchResources = async () => {
    try {
      let url = "/campus-resources";

      if (filter === "available") {
        url = "/campus-resources/available";
      } else if (filter !== "all") {
        // filter by type (Library, Lab, etc.)
        url = "/campus-resources";
        const res = await api.get(url);
        setResources(res.data.filter((r: any) => r.type === filter));
        return;
      }

      const res = await api.get(url);
      setResources(res.data);
    } catch (err) {
      console.error("Failed to fetch campus resources", err);
    }
  };

  // AI best pick (safe logic)
  const bestResource = resources.find(
    (r) =>
      r.isAvailable === true &&
      (r.capacity ?? 0) >= 50
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-indigo-50 p-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Campus Resources
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {["all", "available", "Library", "Lab"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === f
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* AI Highlight */}
      {bestResource && <AiHighlight resource={bestResource} />}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {resources.length ? (
          resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No resources found.
          </p>
        )}
      </div>
    </div>
  );
}
