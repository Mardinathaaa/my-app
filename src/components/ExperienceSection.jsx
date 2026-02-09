import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function formatDate(date) {
  if (!date) return "Now";
  return date; // karena sekarang string
}

export default function ExperienceSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "experience"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl w-full px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      {/* Visual kiri */}
      <div className="hidden md:flex items-center justify-center">
        <div className="w-72 h-80 rounded-2xl border border-white/10 bg-white/5
        flex items-center justify-center text-gray-500">
          Career Journey
        </div>
      </div>

      {/* Konten kanan */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Experience
        </h2>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative pl-8 border-l border-white/20"
            >
              {/* Dot */}
              <span className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-white" />

              {/* Date */}
              <p className="text-xs text-gray-400 mb-1">
                {formatDate(item.tanggal_masuk)} –{" "}
                {item.tanggal_keluar
                  ? formatDate(item.tanggal_keluar)
                  : "Now"}
              </p>

              {/* Company */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">
                  {item.company}
                </h3>

                {item.location && (
                  <a
                    href={item.location}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition"
                    title="Open in Google Maps"
                  >
                    📍
                  </a>
                )}
              </div>

              {/* Role */}
              <p className="text-sm text-gray-300 mb-2">
                {item.role}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
