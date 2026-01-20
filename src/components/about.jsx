import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // pastikan path ini sesuai lokasi file firebase.js

function About() {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchAbout() {
      try {
        const docRef = doc(db, "about", "intro"); // cocok dengan Firestore kamu
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setText(docSnap.data().text); // field kamu bernama "text"
        } else {
          setText("Tidak ada data tentang saya.");
        }
      } catch (error) {
        console.error("Gagal ambil data:", error);
        setText("Terjadi kesalahan saat mengambil data.");
      }
    }

    fetchAbout();
  }, []);

  return (
    <section className="p-6 bg-black text-white">
      <h2 className="text-xl font-bold mb-2">Tentang Saya</h2>
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </section>
  );
}

export default About;