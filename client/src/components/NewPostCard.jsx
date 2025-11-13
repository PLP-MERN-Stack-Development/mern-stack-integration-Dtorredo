import { Link } from 'react-router-dom';

export default function NewPostCard() {
  return (
    <Link to="/create" className="card new-post-card">
      <div className="card-img-container new-post-img-container">
        <div className="new-post-icon">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">Create New Post</h3>
        <p className="card-text" style={{ color: '#C0FAE6', fontStyle: 'italic' }}>
          Click to share your thoughts with the community
        </p>
      </div>
    </Link>
  );
}

