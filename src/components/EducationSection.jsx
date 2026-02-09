import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function EducationSection() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const snap = await getDocs(collection(db, "education"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEducation(data);
        console.log("EDUCATION DATA:", data);

      } catch (err) {
        console.error("Error fetch education:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const slideTo = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[0].offsetWidth + 24;
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActive(index);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading education...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education
          </h2>

          <p className="text-gray-400 leading-relaxed mb-8">
            Latar belakang pendidikan yang membentuk dasar kuat dalam logika,
            pemrograman, dan pengembangan aplikasi modern.
          </p>

          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-hidden"
            >
              {education.map((edu, i) => (
                <div
                  key={edu.id}
                  className={`min-w-[260px] md:min-w-[300px]
                    border rounded-2xl p-6 transition-all duration-300
                    ${
                      i === active
                        ? "border-white/40 bg-white/5"
                        : "border-white/20 opacity-70"
                    }`}
                >
                  <p className="text-sm text-gray-400 mb-1">
                    {edu.tahunmasuk} – {edu.tahunkeluar}
                  </p>

                  <a
                    href={edu.location}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-semibold mb-1 inline-block hover:underline"
                  >
                    {edu.name}
                  </a>

                  <p className="text-gray-300 mb-3">
                    {edu.program}
                  </p>

                  {edu.ipk && (
                    <span className="inline-block px-3 py-1 text-sm border border-white/20 rounded-full text-gray-300">
                      IPK {edu.ipk}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* NAVIGATION */}
            {education.length > 1 && (
              <div className="absolute -bottom-12 left-0 flex items-center gap-4">
                <button
                  onClick={() => slideTo(Math.max(active - 1, 0))}
                  className="w-10 h-10 rounded-full border border-white/20
                  flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  ←
                </button>

                <div className="flex gap-2">
                  {education.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => slideTo(i)}
                      className={`w-2 h-2 rounded-full transition ${
                        i === active ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    slideTo(Math.min(active + 1, education.length - 1))
                  }
                  className="w-10 h-10 rounded-full border border-white/20
                  flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT VISUAL (ANIMATED IMAGE) */}
        <div className="hidden md:flex justify-center relative w-full h-[320px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={education[active]?.imageUrlSchool}
              src={education[active]?.imageUrlSchool}
              alt={education[active]?.name}
              className="absolute w-72 h-80 object-cover rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
