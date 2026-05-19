const BASE_URL = import.meta.env.VITE_API_URL;  // Reads server from .env file and save it


const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");   // Checks if you're logged in, by grabbing token from browser's storage

  // Makes the actual HTTP request
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",                      // Tells backend, i am sending JSON
      ...(token ? { Authorization: `Bearer ${token}` } : {}),  // if token, attach it, if not then skip it.
      ...options.headers,
    },
  });

  // Takes the backend's response and converts it to a Javascript object
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");  // If backend return error, crash with that error message
  return data;
};

export const get = (path) => request(path);
export const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
export const put = (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) });
export const del = (path) => request(path, { method: "DELETE" });
