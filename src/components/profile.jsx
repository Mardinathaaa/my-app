import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const PROFILE_ID = "OHI4fXQk7hgihp1dQpKm"; // document ID kamu

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const ref = doc(db, "profile", PROFILE_ID);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p className="text-white">Loading profile...</p>;
  if (!data) return <p className="text-red-400">Profile tidak ditemukan</p>;

  return (
    <section className="max-w-md mx-auto bg-zinc-900 rounded-xl p-6 text-white">
      <div className="flex items-center gap-4">
        <img
          src={data.photoUrl || "https://via.placeholder.com/80"}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p className="text-sm text-gray-400">{data.title}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>📧 {data.email}</p>
        <p>📍 {data.location}</p>
        <p>📞 {data.phone}</p>
      </div>
    </section>
  );
}

export default Profile;
