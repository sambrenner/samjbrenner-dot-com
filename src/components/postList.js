import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const PostList = ({ posts }) => {
  const postTitles = posts.map(p => (
    <li key={p.node.id}>
      <Link to={p.node.frontmatter.path}>
        {p.node.frontmatter.title}
      </Link>
    </li>
  ));

  return (
    <div>
      <ul>
        {postTitles}
      </ul>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList;
