import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import PostListByYear from "../components/postListByYear";
import NotesSidebar from "../components/notesSidebar";

import noteUtils from '../utils/notes';

import '../css/pages/notes.css'

const BlogPage = ({data}) => {
  const sidebar = <NotesSidebar />;

  return (
    <Layout title="Blog" sidebar={sidebar}>
      <SEO title="Home" />
      <PostListByYear posts={data.allMarkdownRemark.edges}></PostListByYear>
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      },
      filter: {
        frontmatter: {
          type: {
            eq: "post"
          },
          draft: {
            ne: true
          }
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
            categories
          }
        }
      }
    }
  }
`
