import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Analytics from "./pages/Analytics.jsx";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}
