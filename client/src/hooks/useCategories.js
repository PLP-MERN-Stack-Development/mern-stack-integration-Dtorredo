import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    apiFetch('/categories')
      .then((res) => !ignore && setCategories(res))
      .catch((e) => !ignore && setError(e))
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, []);

  return { categories, loading, error, setCategories };
}


