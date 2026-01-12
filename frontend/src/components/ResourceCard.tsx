interface ResourceCardProps {
  resource: {
    name: string;
    type: string;
    building?: string;
    location?: string;
    room?: string;
    floor?: string;
    isAvailable: boolean;
  };
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 relative">
      
      {/* Status Badge */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
          resource.isAvailable
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {resource.isAvailable ? "OPEN" : "BUSY"}
      </span>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        {resource.name}
      </h2>

      <p className="text-sm text-indigo-600 font-medium mb-4">
        {resource.type}
      </p>

      {/* Location Details */}
      <div className="space-y-2 text-gray-700 text-sm">
        {resource.building && (
          <p>
            📍 <span className="font-medium">Location:</span>{" "}
            {resource.building}
            {resource.room && `, ${resource.room}`}
          </p>
        )}

        {resource.floor && (
          <p>
            🏢 <span className="font-medium">Floor:</span>{" "}
            {resource.floor}
          </p>
        )}
        <br></br>
        {resource.location && (
          <p>
            📍 <span className="font-medium">Location:</span>{" "}
            {resource.location}
          </p>
        )}
      </div>
    </div>
  );
}
