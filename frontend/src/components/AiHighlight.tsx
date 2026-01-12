export default function AiHighlight({ resource }: { resource: any }) {
  if (!resource) return null;

  return (
    <div className="mb-10 rounded-3xl p-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xl">
      <p className="text-sm opacity-90 mb-1">🤖 AI Recommendation</p>
      <h2 className="text-2xl font-bold mb-2">{resource.name}</h2>
      <p className="opacity-90">
        Best option right now based on availability & capacity
      </p>
    </div>
  );
}
