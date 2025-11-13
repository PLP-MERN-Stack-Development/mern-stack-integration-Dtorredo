import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api.js';
import { useCategories } from '../hooks/useCategories.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    let ignore = false;
    setLoading(true);
    apiFetch(`/posts/${id}`)
      .then((p) => {
        if (ignore) return;
        setTitle(p.title);
        setContent(p.content);
        setCategory(p.category?._id || '');
        if (p.featuredImageUrl) {
          setExistingImage(p.featuredImageUrl);
        }
      })
      .catch(setError)
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, [id, isEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setExistingImage(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      form.append('category', category);
      if (fileRef.current?.files?.[0]) {
        form.append('featuredImage', fileRef.current.files[0]);
      }
      if (isEdit) {
        await apiFetch(`/posts/${id}`, { method: 'PUT', token, body: form, isForm: true });
      } else {
        await apiFetch('/posts', { method: 'POST', token, body: form, isForm: true });
      }
      navigate('/');
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const displayImage = imagePreview || (existingImage ? `http://localhost:5001${existingImage.startsWith('/') ? existingImage : '/' + existingImage}` : null);

  return (
    <div className="container">
      <form className="stack" onSubmit={onSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffffff' }}>{isEdit ? 'Edit' : 'Create'} Post</h2>
        {error && <p style={{ color: '#ff6b6b' }}>{error.message}</p>}
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#C0FAE6' }}>Title</label>
          <input 
            className="input" 
            placeholder="Enter post title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#C0FAE6' }}>Category</label>
          <select 
            className="select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            disabled={categoriesLoading}
          >
            <option value="" disabled>Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#C0FAE6' }}>Content</label>
          <textarea 
            className="textarea" 
            rows={12} 
            placeholder="Write your post content here..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#C0FAE6' }}>Featured Image</label>
          <input 
            className="input" 
            type="file" 
            accept="image/*" 
            ref={fileRef}
            onChange={handleFileChange}
          />
          {displayImage && (
            <div style={{ marginTop: '12px' }}>
              <img 
                src={displayImage} 
                alt="Preview" 
                style={{ 
                  width: '100%', 
                  maxHeight: '300px', 
                  objectFit: 'cover', 
                  borderRadius: '8px',
                  border: '1px solid var(--border)'
                }} 
              />
              {existingImage && !imagePreview && (
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Current image (upload a new one to replace)
                </p>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn" 
            type="submit" 
            disabled={loading || categoriesLoading}
            style={{ flex: 1 }}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


