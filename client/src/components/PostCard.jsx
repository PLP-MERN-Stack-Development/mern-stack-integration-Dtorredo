import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  // Get image URL - handle both relative and absolute paths
  const imageUrl = post.featuredImageUrl
    ? post.featuredImageUrl.startsWith("http")
      ? post.featuredImageUrl
      : `http://localhost:5001${
          post.featuredImageUrl.startsWith("/")
            ? post.featuredImageUrl
            : "/" + post.featuredImageUrl
        }`
    : null;

  return (
    <div className="card">
      {imageUrl && (
        <div className="card-img-container">
          <img src={imageUrl} alt={post.title} className="card-img" />
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-meta">
          {post.category?.name} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
          {post.author && ` • By ${post.author.name}`}
        </p>
        <p className="card-text">
          {post.content.length > 200
            ? `${post.content.slice(0, 200)}...`
            : post.content}
        </p>
        <Link to={`/posts/${post._id}`} className="btn">
          Read More
        </Link>
      </div>
    </div>
  );
}
