import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function PortfolioSection() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "portofolio"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    };
    fetchData();
  }, []);

  const prev = () => setActive((i) => Math.max(i - 1, 0));
  const next = () =>
    setActive((i) => Math.min(i + 1, items.length - 1));

  const item = items[active];

  if (!item) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading portfolio...
      </div>
    );
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center px-6 md:px-20">
      <div className="w-full max-w-6xl relative">
        {/* SOFT BACKGROUND */}
        <div className="absolute -inset-10 bg-white/5 blur-3xl opacity-40 pointer-events-none" />

        {/* MAIN CONTENT */}
        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <div
            className="relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden
            border border-white/10 bg-black/40 backdrop-blur
            transition-all duration-700"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.tittle}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* TEXT */}
          <div
            key={item.id}
            className="transition-all duration-700 ease-out
            opacity-100 translate-y-0 blur-0"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {item.tittle}
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              {item.description}
            </p>

            <div className="flex items-center gap-4">
              {item.link_demo && (
                <a
                  href={item.link_demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2
                  border border-white/20 rounded-full px-7 py-3
                  hover:bg-white hover:text-black transition"
                >
                  View Demo →
                </a>
              )}

              {items.length > 1 && (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2
                  text-sm text-gray-300 hover:text-white transition"
                >
                  Next Project →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* NAVIGATION DOTS */}
        {items.length > 1 && (
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex gap-3">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active
                    ? "bg-white scale-125"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* ARROW NAV */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              disabled={active === 0}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2
              w-11 h-11 rounded-full border border-white/20
              backdrop-blur flex items-center justify-center
              hover:bg-white hover:text-black transition disabled:opacity-30"
            >
              ←
            </button>

            <button
              onClick={next}
              disabled={active === items.length - 1}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2
              w-11 h-11 rounded-full border border-white/20
              backdrop-blur flex items-center justify-center
              hover:bg-white hover:text-black transition disabled:opacity-30"
            >
              →
            </button>
          </>
        )}
      </div>
    </section>
  );
}
