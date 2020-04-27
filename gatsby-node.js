const noteUtils = require('./src/utils/notes');
const path = require('path');
const slug = require('slug');

exports.createPages = async({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve('src/templates/page.js');
  const categoryTemplate = path.resolve('src/templates/category.js');

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            draft: {
              ne: true
            }
          }
        },
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              type
              categories
              title
              date
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  let posts = [];
  const nonPosts = [];

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.type === 'post') {
      posts.push(node);
    } else {
      nonPosts.push(node);
    }
  });

  posts = posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  posts.forEach((post, i) => {
    createPage({
      path: post.frontmatter.path,
      component: pageTemplate,
      context: {
        post: true,
        prev: i < posts.length - 2 ? {
          url: posts[i + 1].frontmatter.path,
          title: posts[i + 1].frontmatter.title
        } : null,
        next: i > 0 ? {
          url: posts[i - 1].frontmatter.path,
          title: posts[i - 1].frontmatter.title
        }: null
      }
    });
  });

  nonPosts.forEach(nonPost => {
    createPage({
      path: nonPost.frontmatter.path,
      component: pageTemplate
    });
  });

  const categories = noteUtils.getCategoriesForPosts(result.data.allMarkdownRemark.edges);

  categories.forEach(catName => {
    createPage({
      path: `/notes/category/${slug(catName).toLowerCase()}`,
      component: categoryTemplate,
      context: {
        category: catName
      }
    });
  });
}
