import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AboutSection() {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      const ref = doc(db, "about", "intro");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setText(data.text || "");
        setPhoto(data.photoUrl2 || "");
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Foto Frameless */}
      <div className="relative group">
        {/* Glow */}
        <div className="absolute -inset-6 rounded-full bg-white/10 blur-3xl opacity-40 group-hover:opacity-60 transition" />

        {/* Foto */}
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="relative w-full max-w-sm mx-auto object-cover rounded-2xl
            grayscale hover:grayscale-0 transition duration-700 ease-out"
          />
        ) : (
          <div className="relative w-full max-w-sm mx-auto h-80 rounded-2xl bg-white/5 animate-pulse" />
        )}

        {/* Aksen teks kecil */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-gray-400 uppercase">
          Web Developer
        </div>
      </div>

      {/* Konten */}
      <div className="relative">
        <div className="absolute -left-6 top-0 w-px h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent hidden md:block" />

        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          About Me
        </h2>

        <p className="text-gray-300 leading-relaxed text-lg">
          {text || "Loading..."}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/20" />
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Scroll to Explore
          </span>
        </div>
      </div>
    </div>
  );
}
