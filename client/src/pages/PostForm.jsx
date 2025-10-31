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
  const { categories } = useCategories();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const fileRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    let ignore = false;
    apiFetch(`/posts/${id}`)
      .then((p) => {
        if (ignore) return;
        setTitle(p.title);
        setContent(p.content);
        setCategory(p.category?._id || '');
      })
      .catch(setError);
    return () => { ignore = true; };
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      form.append('category', category);
      if (fileRef.current?.files?.[0]) form.append('featuredImage', fileRef.current.files[0]);
      if (isEdit) {
        await apiFetch(`/posts/${id}`, { method: 'PUT', token, body: form, isForm: true });
      } else {
        await apiFetch('/posts', { method: 'POST', token, body: form, isForm: true });
      }
      navigate('/');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form className="stack" onSubmit={onSubmit}>
      <h2>{isEdit ? 'Edit' : 'Create'} Post</h2>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <select className="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="" disabled>Select category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <textarea className="textarea" rows={10} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <input className="input" type="file" accept="image/*" ref={fileRef} />
      <button className="btn" type="submit">{isEdit ? 'Update' : 'Create'}</button>
    </form>
  );
}


