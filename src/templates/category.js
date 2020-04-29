import React from 'react';
import Layout from '../components/layout';
import PostListByYear from '../components/postListByYear';
import NotesSidebar from '../components/notesSidebar';

import { graphql } from 'gatsby';

const sidebar = <NotesSidebar />;

export default function Template({ data, pageContext }) {
  return (
    <Layout title={`Category: ${pageContext.category}`} sidebar={sidebar}>
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
