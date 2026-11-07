import { getClassroomInspoPosts } from '../../lib/API';
import { HOUR_CACHE_CONTROL } from '../../lib/cache';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const category =
    typeof req.query.category === 'string' ? req.query.category.trim() : '';

  if (!category || category.length > 80) {
    return res.status(400).json({ posts: [] });
  }

  try {
    const data = await getClassroomInspoPosts(category);
    res.setHeader('Cache-Control', HOUR_CACHE_CONTROL);
    return res.status(200).json({ posts: data?.nodes || [] });
  } catch {
    return res.status(500).json({ posts: [] });
  }
}
