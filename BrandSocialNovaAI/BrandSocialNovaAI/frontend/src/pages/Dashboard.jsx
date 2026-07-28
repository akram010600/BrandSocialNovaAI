import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { api } from "../api/api.js";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    api.getPosts().then(setPosts).catch((e) => setError(e.message));
    api.getAnalytics().then(setAnalytics).catch((e) => setError(e.message));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    await api.deletePost(id);
    load();
  };

  return (
    <div className="main">
      <Header title="لوحة التحكم" />
      <div className="content">
        {error && <p style={{ color: "#DC2626" }}>{error}</p>}

        {analytics && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="value">{analytics.total_posts}</div>
              <div className="label">إجمالي المنشورات</div>
            </div>
            <div className="stat-card">
              <div className="value">{analytics.published_posts}</div>
              <div className="label">تم نشرها</div>
            </div>
            <div className="stat-card">
              <div className="value">{analytics.total_likes}</div>
              <div className="label">إجمالي الإعجابات</div>
            </div>
            <div className="stat-card">
              <div className="value">{analytics.total_comments}</div>
              <div className="label">إجمالي التعليقات</div>
            </div>
          </div>
        )}

        <h3 style={{ marginBottom: 12 }}>أحدث المنشورات</h3>
        {posts.length === 0 && <p style={{ color: "#6B7280" }}>لسه مفيش منشورات، جرب تنشئ واحد من صفحة "إنشاء منشور".</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
