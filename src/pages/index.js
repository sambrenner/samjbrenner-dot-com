import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import Project from '../components/project';
import SEO from '../components/seo';
import data from '../data';

import '../css/pages/home.css';

const projects = data.map(p => (<Project data={p} key={p.seoname} />));

const IndexPage = () => (
  <Layout title="Portfolio">
    <SEO
      title="Home"
      description="The internet home of Sam Brenner, Software Engineer at Spotify"
      image="http://samjbrenner.com/lib/img/fb.jpg"
    ></SEO>

    <ul id="projects">
      {projects}
    </ul>
  </Layout>
);

export default IndexPage
