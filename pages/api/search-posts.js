import { getSearchPosts } from '../../lib/API';
import { HOUR_CACHE_CONTROL } from '../../lib/cache';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (!query || query.length > 80) {
    return res.status(200).json({ posts: [] });
  }

  try {
    const data = await getSearchPosts(query);
    res.setHeader('Cache-Control', HOUR_CACHE_CONTROL);
    return res.status(200).json({ posts: data?.posts?.edges || [] });
  } catch {
    return res.status(500).json({ posts: [] });
  }
}
