import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import LockedBadge from "../components/LockedBadge";

export default function Gamification() {
  const email = localStorage.getItem("email")!;
  const [progress, setProgress] = useState<any>({});
  const [badges, setBadges] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/gamification/progress/${email}`).then(res => setProgress(res.data));
    api.get(`/gamification/badges/${email}`).then(res => setBadges(res.data));
    api.get(`/gamification/leaderboard`).then(res => setLeaderboard(res.data));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen space-y-10 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Gamification & Progress</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Stay consistent. Earn rewards. Climb the leaderboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Points" 
          value={progress.points} 
          icon="⭐" 
          bgColor="bg-gradient-to-r from-yellow-400 to-yellow-600" 
        />
        <StatCard 
          title="Current Streak" 
          value={`${progress.streak || 0} days`} 
          icon="🔥" 
          bgColor="bg-gradient-to-r from-orange-400 to-red-500" 
        />
        <StatCard 
          title="Badges Earned" 
          value={progress.badges || 0} 
          icon="🏅" 
          bgColor="bg-gradient-to-r from-indigo-500 to-purple-600" 
        />
      </div>

      {/* Badges Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div 
              key={b.id} 
              className="bg-white rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">🏅</div>
              <p className="font-semibold text-gray-800">{b.name}</p>
              <p className="text-sm text-gray-500 mt-1">{b.description}</p>
            </div>
          ))}
          <LockedBadge />
        </div>
      </section>

      {/* Leaderboard Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Leaderboard</h2>
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {leaderboard.map((u, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between px-6 py-4 border-b last:border-none hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-indigo-600">#{i + 1}</span>
                <span className="font-medium">{u.name}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>⭐ {u.points}</span>
                <span>🔥 {u.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
