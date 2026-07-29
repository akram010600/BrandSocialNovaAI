export default function Header({ title }) {
  return (
    <header className="header">
      <h1 style={{ fontSize: 20 }}>{title}</h1>
      <div style={{ fontSize: 14, color: "#6B7280" }}>مرحبًا 👋</div>
    </header>
  );
}
