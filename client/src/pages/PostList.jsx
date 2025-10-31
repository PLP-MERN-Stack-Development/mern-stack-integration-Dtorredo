import { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import { usePosts } from '../hooks/usePosts.js';

export default function PostList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: posts, total, loading, error } = usePosts({ page, limit: 9, search });

  return (
    <div className="stack">
      <div className="toolbar">
        <input className="input" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <div className="grid">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button className="btn" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span>
          Page {page} / {Math.max(1, Math.ceil(total / 9))}
        </span>
        <button className="btn" disabled={page >= Math.ceil(total / 9)} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}


