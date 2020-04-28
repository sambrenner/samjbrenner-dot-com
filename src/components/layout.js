import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Loadable from '@loadable/component';

import '../css/reset.css';
import '../css/fonts.css';
import '../css/layout.css';

const BoatGame = Loadable(() => import('./boatGame'));

const Layout = ({ title, sidebar, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div id="main-container">
      <header>
        <Link to="/">
          <h1>Sam Brenner</h1>
        </Link>
      </header>

      <div id="sidebar">
        <BoatGame />

        <nav>
          <ul>
            <li><Link to="/">Portfolio</Link></li>
            <li><Link to="/notes">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <section id="about">
          <p>
            The internet home of Sam Brenner, Software Engineer at <a href="https://spotify.com">Spotify</a>.
          </p>

          <p>
            Elsewhere on the internet, I can be found on <a href="https://github.com/sambrenner">GitHub</a>, <a href="https://twitter.com/sfwsam">Twitter</a>, and <a href="https://linkedin.com/in/sambrenner">LinkedIn</a>. <a href="https://www.youtube.com/playlist?list=PLrZx1w6R2SyShWak_kQauPyE8TVJ1xCaD">Here are some of my favorite videos on YouTube</a>.
          </p>

          <p>
            I am also available for cyber-correspondence via email: sam at samjbrenner dot com.
          </p>
        </section>

        {sidebar ? (
          <section id="extra-sidebar">
            {sidebar}
          </section>
        ) : <span></span>}
      </div>

      <main>
        <h2>{title}</h2>
        {children}
      </main>

      {sidebar ? (
        <section id="extra-footer">
          {sidebar}
        </section>
      ) : <span></span>}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
