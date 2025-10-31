import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="card">
      {post.featuredImageUrl && (
        <img src={post.featuredImageUrl} alt={post.title} className="card-img" />
      )}
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-meta">{post.category?.name} • {new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="card-text">{post.content.slice(0, 140)}{post.content.length > 140 ? '…' : ''}</p>
        <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
      </div>
    </div>
  );
}


