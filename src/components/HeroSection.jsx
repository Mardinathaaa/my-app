// src/components/HeroSection.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function HeroSection() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Ganti ID dengan doc id milikmu di /profile
        const ref = doc(db, "profile", "OHI4fXQk7hgihp1dQpKm");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full px-10 md:px-24 flex items-center">
      <div className="grid md:grid-cols-2 gap-12 w-full items-center">
        {/* FOTO */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <img
              src={profile.photoUrl || "https://via.placeholder.com/300"}
              alt={profile.name}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover"
            />
            {/* soft glow */}
            <div className="absolute inset-0 rounded-full blur-2xl bg-white/10 -z-10" />
          </div>
        </div>

        {/* TEKS */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            {profile.name}
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            {profile.tittle || "Frontend Developer"}
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <p>{profile.location}</p>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
          </div>

          <div className="mt-8">
            <button className="px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
