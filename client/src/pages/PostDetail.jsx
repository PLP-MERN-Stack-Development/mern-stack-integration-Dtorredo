import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

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
    try {
      await apiFetch(`/posts/${id}`, { method: 'DELETE', token });
      navigate('/');
    } catch (e) {
      alert('Failed to delete post: ' + e.message);
    }
  };

  if (loading) return <div className="container"><p style={{ color: '#C0FAE6' }}>Loading...</p></div>;
  if (error) return <div className="container"><p style={{ color: '#ff6b6b' }}>{error.message}</p></div>;
  if (!post) return <div className="container"><p style={{ color: '#C0FAE6' }}>Post not found</p></div>;

  // Get image URL - handle both relative and absolute paths
  const imageUrl = post.featuredImageUrl 
    ? (post.featuredImageUrl.startsWith('http') 
        ? post.featuredImageUrl 
        : `http://localhost:5001${post.featuredImageUrl.startsWith('/') ? post.featuredImageUrl : '/' + post.featuredImageUrl}`)
    : null;

  // Check if current user is the author
  const isAuthor = user && post.author && (user.id === post.author._id || user.id === post.author.id);

  return (
    <div className="container">
      <div className="post-detail">
        <div className="post-detail-content">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-category">{post.category?.name}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
          <div className="post-content">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph || '\u00A0'}</p>
            ))}
          </div>
          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="btn">Edit Post</Link>
              <button className="btn btn-secondary" onClick={onDelete}>Delete Post</button>
            </div>
          )}
        </div>
        {imageUrl && (
          <div className="post-detail-image">
            <img src={imageUrl} alt={post.title} />
          </div>
        )}
      </div>
    </div>
  );
}


