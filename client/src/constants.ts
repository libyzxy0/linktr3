export const apiBase =
  process.env.NODE_ENV === "production"
    ? "https://linktr3-srv.onrender.com"
    : "http://localhost:8080";
