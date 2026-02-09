import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AboutSection() {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const ref = doc(db, "about", "intro");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setText(data.text || "");
          setPhoto(data.photoUrl2 || "/public/assets/images/Pas Photo.jpg");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section className="w-full flex items-center justify-center px-6 py-32">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* FOTO – APPLE STYLE */}
        <div className="relative group flex justify-center">
          {/* Outer glow */}
          <div
            className="absolute -inset-8 rounded-[32px]
            bg-gradient-to-tr from-white/20 via-white/5 to-transparent
            blur-3xl opacity-40
            group-hover:opacity-60 transition duration-700"
          />

          {/* Glass reflection */}
          <div
            className="absolute inset-0 rounded-[28px]
            bg-gradient-to-b from-white/30 via-transparent to-transparent
            opacity-20 pointer-events-none"
          />

          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="
                relative w-full max-w-sm object-cover rounded-[28px]
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                transition-all duration-700 ease-out
                group-hover:scale-[1.03]
                group-hover:shadow-[0_40px_120px_rgba(0,0,0,0.45)]
              "
            />
          ) : (
            <div className="relative w-full max-w-sm h-80 rounded-[28px] bg-white/5 animate-pulse" />
          )}

          {/* Caption */}
          <div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2
            text-[10px] tracking-[0.35em] text-gray-400 uppercase"
          >
            Frontend Developer
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute -left-6 top-0 w-px h-full
            bg-gradient-to-b from-white/40 via-white/10 to-transparent
            hidden md:block"
          />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed text-lg">
            {text || "Loading..."}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs uppercase tracking-widest text-gray-400">
              Scroll to Explore
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
