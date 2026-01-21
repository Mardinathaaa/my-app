import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";

const slides = [
  { title: "Profile", component: <HeroSection />, steps: 1 },
  { title: "About", component: <AboutSection />, steps: 1 },
  { title: "Education", component: <EducationSection />, steps: 1 },
  { title: "Experience", component: <ExperienceSection />, steps: 1 },
  { title: "Skills", component: <SkillsSection />, steps: 1 },

  // Portfolio dibuat lebih berat
  { title: "Portfolio", component: <PortfolioSection />, steps: 2},

  // Download DISATUKAN
  { title: "Download", component: <DownloadSection />, steps: 2 },
];

function DownloadSection() {
  return (
    <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center px-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">Download</h2>
        <p className="text-gray-400 mb-6">
          Unduh CV, surat lamaran, dan portofolio lengkap saya.
        </p>

        <div className="space-y-4">
          <a className="block border border-white/20 rounded-xl px-6 py-4 hover:bg-white hover:text-black transition">
            Download CV (PDF)
          </a>
          <a className="block border border-white/20 rounded-xl px-6 py-4 hover:bg-white hover:text-black transition">
            Download Surat Lamaran
          </a>
          <a className="block border border-white/20 rounded-xl px-6 py-4 hover:bg-white hover:text-black transition">
            Download Portofolio
          </a>
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <div className="w-64 h-80 border border-white/20 rounded-2xl flex items-center justify-center text-gray-500">
          Preview Area
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (locked) return;
      if (Math.abs(e.deltaY) < 30) return;

      const current = slides[sectionIndex];
      setLocked(true);

      if (e.deltaY > 0) {
        // SCROLL DOWN
        if (step < current.steps) {
          setStep((s) => s + 1);
        } else if (sectionIndex < slides.length - 1) {
          setSectionIndex((i) => i + 1);
          setStep(0);
        }
      } else {
        // SCROLL UP
        if (step > 0) {
          setStep((s) => s - 1);
        } else if (sectionIndex > 0) {
          const prev = slides[sectionIndex - 1];
          setSectionIndex((i) => i - 1);
          setStep(prev.steps);
        }
      }

      setTimeout(() => setLocked(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () =>
      window.removeEventListener("wheel", handleWheel, { passive: false });
  }, [sectionIndex, step, locked]);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* DOT INDICATOR */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === sectionIndex ? "bg-white scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* SLIDE CONTAINER */}
      <div
        className="h-full transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{
          transform: `translateY(-${sectionIndex * 100}vh)`,
        }}
      >
        {slides.map((s, i) => (
          <section
            key={i}
            className="w-screen h-screen flex items-center justify-center relative"
          >
            {/* TITLE */}
           <h1
  className={`absolute text-5xl md:text-6xl font-bold tracking-tight
  transition-all duration-700 ease-out
  ${
    i === sectionIndex && step === 0
      ? "opacity-100 scale-100 blur-0"
      : "opacity-0 scale-90 blur-md"
  }`}
>
  {s.title}
</h1>

            {/* CONTENT */}
       <div
  className={`transition-all duration-700 ease-out
  ${
    i === sectionIndex && step >= 1
      ? "opacity-100 translate-y-0 blur-0 scale-100"
      : "opacity-0 translate-y-24 blur-lg scale-[0.98]"
  }`}
>
  {s.component}
</div>

          </section>
        ))}
      </div>
    </div>
  );
}
