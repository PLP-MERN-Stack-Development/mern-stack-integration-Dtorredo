import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    apiFetch(`/posts/${id}`)
      .then((res) => !ignore && setPost(res))
      .catch((e) => !ignore && setError(e))
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, [id]);

  const onDelete = async () => {
    if (!confirm('Delete this post?')) return;
    await apiFetch(`/posts/${id}`, { method: 'DELETE', token });
    window.history.back();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (!post) return <p>Not found</p>;

  return (
    <div className="stack">
      {post.featuredImageUrl && (
        <img src={post.featuredImageUrl} alt={post.title} style={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 10 }} />
      )}
      <h1>{post.title}</h1>
      <p className="card-meta">{post.category?.name} • {new Date(post.createdAt).toLocaleString()}</p>
      <p>{post.content}</p>
      <div className="row">
        <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
        <button className="btn btn-secondary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}


