const platformLabels = {
  instagram: "Instagram",
  twitter: "Twitter / X",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export default function PostCard({ post, onDelete }) {
  return (
    <div className="post-card">
      <span className="platform-badge">{platformLabels[post.platform] || post.platform}</span>
      <h3>{post.title}</h3>
      <p style={{ color: "#4B5563", marginTop: 6 }}>{post.content}</p>
      <div className="meta">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span>🔁 {post.shares}</span>
        <span>الحالة: {post.status}</span>
      </div>
      {onDelete && (
        <button
          className="secondary"
          style={{ marginTop: 10 }}
          onClick={() => onDelete(post.id)}
        >
          حذف
        </button>
      )}
    </div>
  );
}
