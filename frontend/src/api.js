import axios from 'axios';

const envUrl = import.meta.env.VITE_API_URL;
// If envUrl is empty or just “:3001/api”, fall back to the full localhost URL
const baseURL =
  envUrl && envUrl.startsWith('http')
    ? envUrl
    : 'http://localhost:3001/api';

console.log('🛠️  Using API baseURL:', baseURL);

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});