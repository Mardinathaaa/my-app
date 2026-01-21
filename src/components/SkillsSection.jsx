import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function levelToValue(level) {
  const l = (level || "").toLowerCase();
  if (l.includes("adv")) return 3;
  if (l.includes("int")) return 2;
  return 1;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "skills"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSkills(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl w-full px-10">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        Skills
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((s) => {
          const value = levelToValue(s.level);

          return (
            <div
              key={s.id}
              className="group border border-white/10 rounded-2xl p-5
              bg-white/5 hover:bg-white/10 transition text-center"
            >
              {s.iconUrl && (
                <div className="flex justify-center mb-3">
                  <img
                    src={s.iconUrl}
                    alt={s.name}
                    className="w-10 h-10 object-contain opacity-90 group-hover:scale-110 transition"
                  />
                </div>
              )}

              <p className="font-medium mb-3 text-white">{s.name}</p>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full transition
                      ${i <= value ? "bg-white" : "bg-white/20"}`}
                  />
                ))}
              </div>

              <p className="mt-2 text-xs text-gray-400 capitalize">
                {s.level || "Beginner"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
