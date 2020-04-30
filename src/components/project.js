import React from 'react';
import styles from '../css/components/project.module.css';

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.onMediaClick = this.onMediaClick.bind(this);

    this.state = {
      activeImage: 0
    };
  }

  onMediaClick(e) {
    e.preventDefault();

    const idx = parseFloat(e.target.dataset.idx);

    this.setState(state => {
      return {
        activeImage: idx
      };
    });
  }

  render() {
    const links = this.props.data.links ? this.props.data.links.map((l, i) => (<span key={l.href}>
      <a href={l.href}>
        {l.text}
      </a>{i < this.props.data.links.length - 1 ? ', ' : ''}
    </span>)) : <></>;

    const carousel = (<ul className={styles.projectMedia}>
      {this.props.data.visual.map((v, i) => {
        let media;

        switch (v.type) {
          case 'vimeo':
            media = (<div className="video-embed">
              <iframe src={`${v.url}?title=0&byline=0&portrait=0`}></iframe>
            </div>);
            break;
          case 'image':
          default:
            media = <img src={v.url} />;
            break;
        }

        return (<li key={i} className={i === this.state.activeImage ? styles.active : ''}>
          {media}
        </li>)
      })}
    </ul>);

    const imageLinks = this.props.data.visual.length > 1 ? (<div className={styles.additionalMediaLinks}>
      <span>Additional Media:</span>
      <ul>
        {this.props.data.visual.map((v, i) => (
          <li key={i} className={i === this.state.activeImage ? 'active' : ''}>
            <a
              href={v.url}
              data-idx={i}
              onClick={this.onMediaClick}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>) : null;

    return (
      <li key={this.props.data.seoname} className={styles.project}>
        {carousel}

        <h3>{this.props.data.title}</h3>

        <h4>
          {this.props.data.client}{this.props.data.client ? ', ' : ''}{this.props.data.year}
        </h4>

        <div dangerouslySetInnerHTML={{ __html: this.props.data.description }}></div>

        <p>
          {links}
        </p>

        {imageLinks}
      </li>
    );
  }
}
