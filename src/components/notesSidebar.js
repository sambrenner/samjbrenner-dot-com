import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, Link, graphql } from 'gatsby';

import * as noteUtils from '../utils/notes';

const NotesSidebar = () => {
  return (
    <StaticQuery
      query={graphql`
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
      `}

      render={data => (
        <div>
          <h3>Blog Categories</h3>
          <ul className="category-list">
            <li key={0}>
              <Link to="/notes">All Categories</Link>
            </li>

            {noteUtils
              .getCategoriesForPosts(data.allMarkdownRemark.edges)
              .map(c => (
                <li key={c}>
                  <Link to={noteUtils.getUrlForCategory(c)}>{c}</Link>
                </li>))
            }
          </ul>
        </div>
      )}
    />
  )
}

export default NotesSidebar;
