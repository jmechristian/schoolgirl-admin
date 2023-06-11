const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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
  const data = await fetchAPI(`
    {
      posts(first: 200) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getPostsForBlogHome() {
  const data = await fetchAPI(
    `
    query NewQuery {
      posts(first: 9, where: {status: PUBLISH}) {
        nodes {
          featuredImage {
            node {
              sourceUrl
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
  return data?.posts;
}

export async function getClassroomInspoPosts() {
  const data = await fetchAPI(
    `
    query NewQuery {
      posts(first: 9, where: {status: PUBLISH, categoryName: "Classroom Inspiration"}) {
        nodes {
          featuredImage {
            node {
              sourceUrl
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
    }
  `
  );
  return data?.posts;
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
                sourceUrl
              }
            }
            link
            slug
            title
            content
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
