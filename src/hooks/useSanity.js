import { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';

/**
 * useSanity — generic data-fetching hook for Sanity GROQ queries.
 *
 * @param {string} query     — GROQ query string
 * @param {object} params    — optional GROQ parameters
 * @param {any}    fallback  — value returned before data arrives ([] or {})
 *
 * @returns {{ data, loading, error }}
 *
 * Example:
 *   const { data: posts, loading } = useSanity(BLOG_QUERY, {}, []);
 */
export function useSanity(query, params = {}, fallback = null) {
  const [data,    setData]    = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    client
      .fetch(query, params)
      .then((result) => {
        setData(result ?? fallback);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[Sanity] Fetch error:', err);
        setError(err.message || 'Failed to load content');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, error };
}
