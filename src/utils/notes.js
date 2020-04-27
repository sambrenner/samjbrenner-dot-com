const slug = require('slug');

module.exports = {
  getCategoriesForPosts: (posts) => {
    return posts.reduce((cats, post) => {
      const node = post.node;

      if (node.frontmatter && node.frontmatter.categories) {
        node.frontmatter.categories.forEach(c => {
          if (!cats.includes(c)) {
            cats.push(c);
          }
        });
      }

      return cats.sort((a, b) => a.localeCompare(b));
    }, []);
  },

  getUrlForCategory: (category) => {
    return `/notes/category/${slug(category).toLowerCase()}`;
  }
};
