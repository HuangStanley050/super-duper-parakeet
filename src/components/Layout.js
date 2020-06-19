import React from 'react';
import { Link } from 'gatsby';
import './Layout.css';
import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const isRootPath = location.pathname === `${__PATH_PREFIX__}/`;
    const pageNumber = location.pathname
      .split('/')
      .filter(Boolean)
      .pop();
    const isPaginatedPath = pageNumber && Boolean(pageNumber.match(/^[0-9]+$/));
    let header;

    if (isRootPath || isPaginatedPath) {
      header = (
        <div>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <h4 style={{ textAlign: 'center' }}>
            <Link
              style={{
                boxShadow: `none`,
                backgroundColor: 'yellow',
                border: `2px solid red`,
                textDecoration: `none`,
                color: `navy`,
              }}
              to={`/search`}
            >
              Search
            </Link>
          </h4>
        </div>
      );
    } else {
      header = (
        <h1
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            color: 'dodgerBlue',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    }
    return (
      <section style={{ backgroundColor: 'lightblue' }}>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            minHeight: '100vh',
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </section>
    );
  }
}

export default Layout;
