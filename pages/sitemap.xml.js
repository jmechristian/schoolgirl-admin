import { getAllPostsWithSlug } from '../lib/API';

const URL = 'https://www.schoolgirlstyle.com';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
         <!-- Add the static URLs manually -->
         <url>
           <loc>${URL}</loc>
         </url>
         <url>
           <loc>${URL}/about</loc>
         </url>
          <url>
           <loc>${URL}/blog</loc>
         </url>
          <url>
           <loc>${URL}/giving</loc>
         </url>
         <url>
           <loc>${URL}/hey-teach</loc>
         </url>
         <url>
           <loc>${URL}/shop</loc>
         </url>
         <url>
           <loc>${URL}/visit</loc>
         </url>
         <url>
           <loc>${URL}/watch</loc>
         </url>
         ${posts
           .map(({ slug }) => {
             return `
               <url>
                   <loc>${`${URL}/blog/${slug}`}</loc>
               </url>
             `;
           })
           .join('')}
       </urlset>
     `;
  console.log('posts', posts);
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsWithSlug();

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(posts.nodes);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
