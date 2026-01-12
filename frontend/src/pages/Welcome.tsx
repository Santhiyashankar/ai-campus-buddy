import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center">
      <div className="max-w-5xl w-full px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-white">
          
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            🎓 AI Campus Buddy
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Your intelligent campus companion to manage tasks, boost productivity,
            collaborate smarter, and stay ahead — powered by AI.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Feature title="📋 Smart Tasks" desc="Organize classes, deadlines & priorities" />
            <Feature title="🤖 AI Assistance" desc="Study tips & productivity insights" />
            <Feature title="🤝 Collaboration" desc="Connect & study with peers" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-xl text-center hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="px-8 py-3 border border-white/40 rounded-xl text-center hover:bg-white/10 transition"
            >
              Create Account
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-8">
          © 2026 AI Campus Buddy · Built with ❤️ & AI
        </p>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-5">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  );
}
