import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const email = localStorage.getItem("email") ?? "";

  const [profile, setProfile] = useState({
    name: "",
    email: email,
    interests: "",
    availability: "",
    notificationType: "EMAIL", // new feature
    aiPersonalization: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get(`/profile/${email}`);
    setProfile(res.data);
  };

  const updateProfile = async () => {
    setLoading(true);
    setSuccess("");

    await api.put("/profile/update", profile);

    setSuccess("Profile updated successfully");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {profile.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h2>
            <p className="text-gray-500 text-sm">
              Manage your personal information & preferences
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              className="w-full mt-1 p-3 border rounded-xl bg-gray-100 cursor-not-allowed"
              value={profile.email}
              disabled
            />
          </div>

          {/* Interests */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Interests
            </label>
            <input
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="AI, Web Dev, Cyber Security"
              value={profile.interests || ""}
              onChange={(e) =>
                setProfile({ ...profile, interests: e.target.value })
              }
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Availability
            </label>
            <select
              className="w-full mt-1 p-3 border rounded-xl"
              value={profile.availability || ""}
              onChange={(e) =>
                setProfile({ ...profile, availability: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>

          {/* Notification Preferences */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Notifications
            </label>
            <div className="flex gap-4 mt-2">
              {["EMAIL", "SMS"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setProfile({ ...profile, notificationType: type })
                  }
                  className={`px-5 py-2 rounded-xl border transition
                    ${
                      profile.notificationType === type
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {type === "EMAIL" ? "📧 Email" : "📱 SMS"}
                </button>
              ))}
            </div>
          </div>

          {/* AI Personalization */}
          <div className="md:col-span-2 flex items-center justify-between bg-indigo-50 p-4 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">
                AI Personalization
              </p>
              <p className="text-sm text-gray-500">
                Enable smart recommendations based on your behavior
              </p>
            </div>
            <input
              type="checkbox"
              checked={profile.aiPersonalization}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  aiPersonalization: e.target.checked,
                })
              }
              className="w-6 h-6 accent-indigo-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          {success && (
            <p className="text-green-600 text-sm mr-auto">{success}</p>
          )}

          <button
            onClick={updateProfile}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
