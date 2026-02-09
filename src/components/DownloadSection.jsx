import { useEffect, useRef, useState } from "react";

const files = [
  {
    title: "Curriculum Vitae",
    desc: "CV terbaru (PDF)",
    file: "/assets/docs/CV_Mardinatha.pdf",
  },
  {
    title: "Sertifikat",
    desc: "Dokumen pendukung",
    file: "/assets/docs/Sertifikat.pdf",
  },
  {
    title: "TOEFL Score",
    desc: "Skor TOEFL EPRT",
    file: "/assets/docs/Toefl Eprt Score Mardinatha Tumpal Panahathan.pdf",
  },
  {
    title: "Transkrip Nilai",
    desc: "Nilai akademik",
    file: "/assets/docs/Transkip Nilai.pdf",
  },
];

export default function DownloadSection({goToTop}) {
  const [active, setActive] = useState(files[0]);
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState("idle");
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* SCROLL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const triggerDownload = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = () => {
    setStatus("loading");
    setTimeout(() => {
      triggerDownload(active.file);
      setStatus("done");
      setTimeout(() => {
        setConfirm(false);
        setStatus("idle");
      }, 1200);
    }, 1500);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 py-24 transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Download</h2>
            <p className="text-gray-400 mb-10">
              Dokumen resmi tersedia untuk diunduh sebagai referensi profesional.
            </p>

            <div className="space-y-4">
              {files.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(item)}
                  className={`w-full flex justify-between items-center
                  rounded-2xl px-6 py-5 border backdrop-blur-xl
                  transition-all duration-300
                  ${
                    active.title === item.title
                      ? "bg-white text-black scale-[1.03]"
                      : "border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm opacity-70">{item.desc}</div>
                  </div>
                  {active.title === item.title && (
                    <span className="text-sm">Selected</span>
                  )}
                </button>
              ))}
            </div>

            {/* BUTTON AREA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setConfirm(true)}
                className="inline-flex items-center gap-3
                px-8 py-4 rounded-full
                bg-white/20 backdrop-blur-xl border border-white/30
                hover:bg-white hover:text-black
                transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon status={status} />
                Download
              </button>

              <button
                onClick={goToTop
                }
               className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
              >
                Finish
                <span className="text-lg leading-none">↑</span>
              </button>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-white/10 blur-[70px] rounded-3xl" />
            <div
              className="relative h-[700px] w-[460px]
              rounded-2xl overflow-hidden
              bg-black/40 backdrop-blur-xl
              border border-white/15"
            >
              <iframe
                src={active.file}
                title="Preview"
                className="w-full h-full"
              />

              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2
                px-4 py-1.5 rounded-lg
                bg-black/60 backdrop-blur-md
                text-xs text-white/70"
              >
                Preview — {active.title}
              </div>
            </div>
          </div>
        </div>

        {/* CONFIRM MODAL */}
        {confirm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl
          flex items-center justify-center">
            <div className="w-[90%] max-w-md rounded-3xl
            bg-white/10 backdrop-blur-xl border border-white/20
            p-8 text-center animate-[fadeIn_0.25s_ease-out]">
              <h3 className="text-xl font-semibold mb-2">Download File</h3>
              <p className="text-gray-400 mb-8">
                Apakah Anda ingin mengunduh <b>{active.title}</b>?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirm(false)}
                  className="px-5 py-2 rounded-full border border-white/30
                  hover:bg-white/10 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 rounded-full bg-white text-black"
                >
                  {status === "loading" ? "Downloading…" : "Download"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

/* ICON */
function DownloadIcon({ status }) {
  if (status === "loading") {
    return (
      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  if (status === "done") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
