import axios from "axios";

const ROOT = import.meta.env.VITE_API_URL;
console.log("▶️ VITE_API_URL:", ROOT);

export default axios.create({
  baseURL: `${ROOT}/api`,    // ← now calls http://localhost:3001/api/…
});