import React from 'react';
import PropTypes from 'prop-types';
import PostList from './postList';

const PostListByYear = ({ posts }) => {
  const postsByYear = posts.reduce((ps, p) => {
    const year = new Date(p.node.frontmatter.date).getFullYear();

    if (!ps[year]) {
      ps[year] = [p];
    } else {
      ps[year].push(p);
    }

    return ps;
  }, {});

  const lists = Object.keys(postsByYear)
    .sort((a, b) => b - a)
    .map(yr => (
      <div key={yr}>
        <h3>{yr}</h3>
        <PostList posts={postsByYear[yr]}></PostList>
      </div>
    ));

  return (<div>
    {lists}
  </div>)
}

PostListByYear.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostListByYear;
