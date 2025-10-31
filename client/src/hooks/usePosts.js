import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';

export function usePosts({ page = 1, limit = 10, search = '' } = {}) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    apiFetch(`/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
      .then((res) => {
        if (ignore) return;
        setData(res.data);
        setTotal(res.total);
      })
      .catch((e) => !ignore && setError(e))
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, [page, limit, search]);

  return { data, total, loading, error, setData };
}


