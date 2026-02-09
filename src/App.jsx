import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";
import DownloadSection from "./components/DownloadSection";

export default function App() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);
  const [jumping, setJumping] = useState(false); // ✨ animasi jump

  const slides = [
    { title: "Profile", component: <HeroSection />, steps: 1 },
    { title: "About", component: <AboutSection />, steps: 1 },
    { title: "Education", component: <EducationSection />, steps: 1 },
    { title: "Experience", component: <ExperienceSection />, steps: 1 },
    { title: "Skills", component: <SkillsSection />, steps: 1 },
    { title: "Portfolio", component: <PortfolioSection />, steps: 2 },
    {
      title: "Document",
      component: (
        <DownloadSection
          goToTop={() => {
            if (locked) return;
            setLocked(true);
            setJumping(true);

            setTimeout(() => {
              setSectionIndex(0);
              setStep(0);
            }, 400);

            setTimeout(() => {
              setJumping(false);
              setLocked(false);
            }, 1200);
          }}
        />
      ),
      steps: 2,
    },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (locked || jumping) return;
      if (Math.abs(e.deltaY) < 30) return;

      const current = slides[sectionIndex];
      setLocked(true);

      if (e.deltaY > 0) {
        if (step < current.steps) {
          setStep((s) => s + 1);
        } else if (sectionIndex < slides.length - 1) {
          setSectionIndex((i) => i + 1);
          setStep(0);
        }
      } else {
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
  }, [sectionIndex, step, locked, jumping]);

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
        className={`h-full transition-transform duration-[900ms]
        ease-[cubic-bezier(.22,.61,.36,1)]`}
        style={{
          transform: `translateY(-${sectionIndex * 100}vh)`,
        }}
      >
        {slides.map((s, i) => (
          <section
            key={i}
            className={`w-screen h-screen flex items-center justify-center relative
            transition-all duration-500
            ${
              jumping && i === sectionIndex
                ? "opacity-0 scale-95 blur-sm"
                : "opacity-100 scale-100"
            }`}
          >
            {/* TITLE */}
            <h1
              className={`absolute text-5xl md:text-6xl font-bold tracking-tight
              transition-all duration-700
              ${
                i === sectionIndex && step === 0
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 blur-md"
              }`}
            >
              {s.title}
            </h1>

            {/* CONTENT */}
            <div
              className={`transition-all duration-700
              ${
                i === sectionIndex && step >= 1
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-24 scale-[0.98] blur-lg"
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
