import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard.jsx';
import NewPostCard from '../components/NewPostCard.jsx';
import { usePosts } from '../hooks/usePosts.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: posts, total, loading, error } = usePosts({ page, limit: 9, search });
  const { token } = useAuth();

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(total / 9));

  return (
    <div className="container">
      <div className="stack">
        <div className="toolbar">
          <input 
            className="input" 
            placeholder="Search posts by title..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
            Loading posts...
          </div>
        )}

        {error && (
          <div style={{ padding: '16px', background: 'rgba(255, 107, 107, 0.2)', color: '#ff6b6b', borderRadius: '8px', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
            {error.message}
          </div>
        )}

        {!loading && !error && posts.length === 0 && !token && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No posts found</p>
            <p>{search ? 'Try a different search term' : 'Be the first to create a post!'}</p>
          </div>
        )}

        {!loading && !error && (posts.length > 0 || token) && (
          <>
            <div className="grid">
              {token && <NewPostCard />}
              {posts.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="row" style={{ justifyContent: 'space-between', marginTop: '24px', alignItems: 'center' }}>
                <button 
                  className="btn" 
                  disabled={page === 1} 
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Page {page} of {totalPages} ({total} {total === 1 ? 'post' : 'posts'})
                </span>
                <button 
                  className="btn" 
                  disabled={page >= totalPages} 
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


