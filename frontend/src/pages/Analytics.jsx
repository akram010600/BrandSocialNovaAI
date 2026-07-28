import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { api } from "../api/api.js";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAnalytics().then(setData).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="main">
      <Header title="التحليلات" />
      <div className="content">
        {error && <p style={{ color: "#DC2626" }}>{error}</p>}
        {!data && !error && <p>جاري التحميل...</p>}

        {data && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="value">{data.total_posts}</div>
                <div className="label">إجمالي المنشورات</div>
              </div>
              <div className="stat-card">
                <div className="value">{data.total_likes}</div>
                <div className="label">إعجابات</div>
              </div>
              <div className="stat-card">
                <div className="value">{data.total_comments}</div>
                <div className="label">تعليقات</div>
              </div>
              <div className="stat-card">
                <div className="value">{data.total_shares}</div>
                <div className="label">مشاركات</div>
              </div>
            </div>

            <div className="post-card">
              <h3 style={{ marginBottom: 12 }}>توزيع المنشورات حسب المنصة</h3>
              {data.by_platform.length === 0 && <p style={{ color: "#6B7280" }}>لا توجد بيانات بعد.</p>}
              {data.by_platform.map((item) => (
                <div key={item.platform} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span>{item.platform}</span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
