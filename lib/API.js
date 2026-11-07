import { createClient } from '@supabase/supabase-js';
import { pickSizedUrl } from './wpImages';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

function preferLargeImage(image) {
  if (!image) return;
  image.sourceUrl = image.sourceUrl || image.fullSourceUrl || null;
  delete image.fullSourceUrl;
}

function preferLargePostImages(posts) {
  const nodes = posts?.nodes || posts?.edges?.map((edge) => edge.node);
  nodes?.forEach((node) => preferLargeImage(node?.featuredImage?.node));
}

async function fetchAPI(query = '', { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const nodes = [];
  let after = null;
  let hasNextPage = true;

  for (let page = 0; page < 20 && hasNextPage; page += 1) {
    const data = await fetchAPI(
      `
      query AllPostSlugs($after: String) {
        posts(first: 100, after: $after, where: {status: PUBLISH}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            slug
          }
        }
      }
    `,
      { variables: { after } }
    );

    const posts = data?.posts;
    nodes.push(...(posts?.nodes || []));
    hasNextPage = Boolean(
      posts?.pageInfo?.hasNextPage && posts?.pageInfo?.endCursor
    );
    after = posts?.pageInfo?.endCursor || null;
  }

  return { nodes };
}

export async function getPostsForBlogHome() {
  const data = await fetchAPI(
    `
    query NewQuery {
      posts(first: 9, where: {status: PUBLISH}) {
        nodes {
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              fullSourceUrl: sourceUrl
              altText
            }
          }
          dateGmt
          title
          slug
        }
      }
    }
  `
  );
  preferLargePostImages(data?.posts);
  return data.posts;
}

export async function getClassroomInspoPosts(cat) {
  const data = await fetchAPI(
    `
    query NewQuery($cat: String!) {
      posts(first: 9, where: {status: PUBLISH, categoryName: $cat}) {
        nodes {
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              fullSourceUrl: sourceUrl
              altText
            }
          }
          dateGmt
          title
          slug
          categories {
            nodes {
              name
            }
          }
        }
      }
    },
    
  `,
    {
      variables: {
        cat: cat,
      },
    }
  );
  preferLargePostImages(data?.posts);
  return data?.posts;
}

export async function getPostCategories() {
  const data = await fetchAPI(
    `
    query NewQuery {
      categories(first: 50, where: {orderby: COUNT}) {
        nodes {
          count
          name
        }
      }
    }
  `
  );
  return data?.categories;
}

export async function getSearchPosts(slug) {
  const data = await fetchAPI(
    `
    query NewQuery($id: String!) {
      posts(first: 20, after: null, where: {search: $id}) {
        edges {
          node {
            dateGmt
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                fullSourceUrl: sourceUrl
              }
            }
            slug
            title
            excerpt
          }
        }
      }
    },
  `,
    {
      variables: {
        id: slug,
      },
    }
  );

  preferLargePostImages(data?.posts);
  return data;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query NewQuery {
        posts {
          nodes {
            categories {
              nodes {
                name
              }
            }
            content
            dateGmt
            featuredImage {
              node {
                altText
                sourceUrl(size: FEATURED_IMAGE)
              }
            }
            slug
            tags {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
              categories {
                nodes {
                  name
                }
              }
              content(format: RENDERED)
              dateGmt
              featuredImage {
                node {
                  altText
                  sourceUrl
                  srcSet
                }
              }
              id
              slug
              tags {
                nodes {
                  name
                  id
                }
              }
              title(format: RENDERED)
              excerpt(format: RENDERED)
            }
          }
        `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  );

  const image = data?.post?.featuredImage?.node;
  if (image?.sourceUrl) {
    image.sourceUrl = pickSizedUrl(image.sourceUrl, image.srcSet, 1536);
    delete image.srcSet;
  }

  return data;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === 'draft';
  const isRevision = isSamePost && postPreview?.status === 'publish';
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
