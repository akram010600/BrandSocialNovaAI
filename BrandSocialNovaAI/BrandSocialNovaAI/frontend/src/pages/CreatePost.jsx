import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { api } from "../api/api.js";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    platform: "instagram",
    status: "draft",
  });
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setError("");
    try {
      const result = await api.generateContent({ topic, platform: form.platform });
      setForm({ ...form, title: result.title, content: result.content });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.createPost(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main">
      <Header title="إنشاء منشور جديد" />
      <div className="content">
        {error && <p style={{ color: "#DC2626" }}>{error}</p>}

        <div className="post-card">
          <h3 style={{ marginBottom: 10 }}>✨ توليد محتوى بالذكاء الاصطناعي</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #D1D5DB" }}
              placeholder="اكتب الموضوع (مثال: افتتاح فرع جديد)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button type="button" onClick={handleGenerate} disabled={loading}>
              {loading ? "جاري التوليد..." : "ولّد"}
            </button>
          </div>
        </div>

        <form className="create-form post-card" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="عنوان المنشور"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            rows={5}
            placeholder="محتوى المنشور"
            value={form.content}
            onChange={handleChange}
            required
          />
          <select name="platform" value={form.platform} onChange={handleChange}>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter / X</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="draft">مسودة</option>
            <option value="scheduled">مجدول</option>
            <option value="published">منشور</option>
          </select>
          <button type="submit">حفظ المنشور</button>
        </form>
      </div>
    </div>
  );
}
