import React from 'react';
import Layout from '../components/layout';
import PostListByYear from '../components/postListByYear';
import NotesSidebar from '../components/notesSidebar';
import SEO from '../components/seo';

import { graphql } from 'gatsby';

const sidebar = <NotesSidebar />;

export default function Template({ data, pageContext }) {
  return (
    <Layout title={`Category: ${pageContext.category}`} sidebar={sidebar}>
      <SEO
        title={pageContext.category}
        description="The internet home of Sam Brenner, Software Engineer at Spotify"
        image="http://samjbrenner.com/lib/img/fb.jpg"
      ></SEO>

      <PostListByYear posts={data.allMarkdownRemark.edges}></PostListByYear>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      },
      filter: {
        frontmatter: {
          categories: { eq: $category },
          draft: { ne: true }
        }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
`;
