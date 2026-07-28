import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>BrandSocialNova AI</h2>
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        📊 لوحة التحكم
      </NavLink>
      <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : "")}>
        ✏️ إنشاء منشور
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => (isActive ? "active" : "")}>
        📈 التحليلات
      </NavLink>
    </aside>
  );
}
