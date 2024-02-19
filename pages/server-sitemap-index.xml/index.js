// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from 'next-sitemap';
import { getAllPostsWithSlug } from '../../lib/API';

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const allPosts = await getAllPostsWithSlug();
  const paths = allPosts.nodes.map(
    (post) => 'https://www.schoolgirlstyle.com/' + post.slug
  );

  return getServerSideSitemapIndexLegacy(ctx, paths);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
