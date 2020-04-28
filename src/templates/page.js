import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import NotesSidebar from '../components/notesSidebar';
import * as noteUtils from '../utils/notes';
import 'highlight.js/styles/routeros.css';

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frontmatter: props.data.markdownRemark.frontmatter,
      html: props.data.markdownRemark.html,
      pageContext: props.pageContext
    };
  }

  async componentDidMount() {
    if (
      this.state.frontmatter.uses &&
      this.state.frontmatter.uses.includes('processing.js')
    ) {
      if (window && !window.Processing) {
        await import('processing-js');
      }

      window.Processing.reload();
    }
  }

  render() {
    let postMeta = null;
    let sidebar = null;

    if (this.state.pageContext.post) {
      const date = new Date(this.state.frontmatter.date)
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

      const categories = this.state.frontmatter.categories
        .sort((a, b) => a.localeCompare(b))
        .map((c, i) => {
          let suffix = ', ';

          if (i === this.state.frontmatter.categories.length - 2) {
            suffix = ', and ';
          }

          if (i === this.state.frontmatter.categories.length - 1) {
            suffix = '.';
          }

          return (
            <span key={i}>
              <Link to={noteUtils.getUrlForCategory(c)}>{c}</Link>{suffix}
            </span>
          );
        });

      const chMeta = this.state.frontmatter.churl ? (
        <p>This post was originally published on the <a href={this.state.frontmatter.churl}>Cooper Hewitt Labs Blog</a>.</p>
      ) : null;

      postMeta = (<div className="post-meta">
        <p>Posted on {date} in {categories}</p>
        {chMeta}
      </div>);

      sidebar = <NotesSidebar />;
    }

    let prev, next;

    if (this.state.pageContext.post) {
      if (this.state.pageContext.prev) {
        prev = (<p>
          Previous Post:&nbsp;
          <Link to={this.state.pageContext.prev.url}>
            {this.state.pageContext.prev.title}
          </Link>
        </p>);
      }

      if (this.state.pageContext.next) {
        next = (<p>
          Next Post:&nbsp;
          <Link to={this.state.pageContext.next.url}>
            {this.state.pageContext.next.title}
          </Link>
        </p>);
      }
    }

    const classes = ['page-content', ...this.state.pageContext.post ? ['post'] : []];

    return (
      <Layout
        title={this.state.frontmatter.title}
        sidebar={sidebar}
      >
        {postMeta}

        <div
          className={classes.join(' ')}
          dangerouslySetInnerHTML={{ __html: this.state.html }}
        />

        {prev}
        {next}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
        categories
        churl
        uses
      }
    }
  }
`;
