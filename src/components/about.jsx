import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function About() {
  const fetched = useRef(false);
  const [text, setText] = useState("Memuat...");

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function fetchAbout() {
      const docRef = doc(db, "about", "intro");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setText(docSnap.data().text);
      }
    }

    fetchAbout();
  }, []);

  return (
    <section className="p-6 bg-black text-white">
      <h2 className="text-xl font-bold mb-2">Tentang Saya</h2>
      <p>{text}</p>
    </section>
  );
}

export default About;
