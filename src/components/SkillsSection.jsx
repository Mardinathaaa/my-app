import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function levelToValue(level) {
  const n = Number(level);
  if (n >= 3) return 3;
  if (n === 2) return 2;
  return 1;
}

function levelColor(value) {
  if (value === 1) return "bg-red-500";
  if (value === 2) return "bg-yellow-400";
  return "bg-green-500";
}

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "skills"));
      setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl w-full px-10">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-3">
        Skills
      </h2>

       {/* Legend */}
      <div className="flex justify-center gap-6 mb-10 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          Beginner
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          Intermediate
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Advanced
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((s) => {
          const value = levelToValue(s.level);
          const color = levelColor(value);

          return (
            <div
              key={s.id}
              className="
                group rounded-2xl p-5 text-center
                border border-white/10 bg-white/5
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40
              "
            >
              {/* Icon */}
              {s.iconUrl && (
                <div className="flex justify-center mb-4">
                  <img
                    src={s.iconUrl}
                    alt={s.name}
                    className="w-10 h-10 object-contain
                    transition-transform duration-500
                    group-hover:scale-110"
                  />
                </div>
              )}

              {/* Name */}
              <p className="font-medium text-white mb-4">
                {s.name}
              </p>

              {/* Wave Bars */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="relative h-2 w-8 rounded-full bg-white/20 overflow-hidden"
                  >
                    {i <= value && (
                      <span
                        className={`
                          absolute inset-0 rounded-full ${color}
                          animate-skill-wave
                        `}
                        style={{
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
