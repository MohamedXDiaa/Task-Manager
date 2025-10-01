import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
    }
});

export default api;