// src/components/HeroSection.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function HeroSection() {
  const [profile, setProfile] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
    <>
      <div className="w-full h-full px-10 md:px-60 flex items-center">
        <div className="grid md:grid-cols-2 gap-12 w-full items-center">

          {/* FOTO */}
          <div className="flex justify-center md:justify-start">
            <div
              className="relative cursor-pointer group"
              onClick={() => setShowPhoto(true)}
            >
              <img
                src={
                  profile.photoUrl ||
                  "/assets/images/Photo Seluruh Badan.jpeg"
                }
                alt={profile.name}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover
                transition-transform duration-300 group-hover:scale-105"
              />

              {/* glow */}
              <div className="absolute inset-0 rounded-full blur-2xl bg-white/10 -z-10" />

              {/* hint */}
              <div className="absolute inset-0 rounded-full bg-black/40
              opacity-0 group-hover:opacity-100 transition
              flex items-center justify-center text-sm text-white">
                Click to view
              </div>
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

            <div className="space-y-3 text-sm text-gray-400">
              <p>{profile.location}</p>

              {/* EMAIL */}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="block hover:text-white transition cursor-pointer"
                >
                 {profile.email}
                </a>
              )}

              {/* GITHUB */}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition cursor-pointer"
                >
                  GitHub Repository
                </a>
              )}
            </div>

            {/* CONTACT */}
            <div className="mt-8">
              <a
                href={`https://wa.me/${profile.phone
                  ?.replace(/\D/g, "")
                  ?.replace(/^0/, "62")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2
                px-6 py-3 rounded-full
                border border-white/30
                hover:bg-white hover:text-black
                transition cursor-pointer"
              >
              Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN PHOTO MODAL */}
      {showPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl
          flex items-center justify-center animate-[fadeIn_0.25s_ease-out]"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="relative max-w-3xl w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                profile.photoUrl ||
                "/assets/images/Photo Seluruh Badan.jpeg"
              }
              alt="Full Photo"
              className="w-full rounded-3xl object-contain"
            />

            {/* CLOSE */}
            <button
              onClick={() => setShowPhoto(false)}
              className="absolute -top-4 -right-4
              w-10 h-10 rounded-full
              bg-white text-black
              flex items-center justify-center
              hover:scale-105 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
