const BASE_URL = "http://localhost:8000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "حصل خطأ في الاتصال بالسيرفر");
  }
  return res.json();
}

export const api = {
  getPosts: () => request("/posts"),
  createPost: (payload) =>
    request("/posts", { method: "POST", body: JSON.stringify(payload) }),
  deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),
  generateContent: (payload) =>
    request("/generate", { method: "POST", body: JSON.stringify(payload) }),
  getAnalytics: () => request("/analytics"),
};
