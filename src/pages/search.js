import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

const Search = ({ location, data }) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      let result = await window.__LUNR__.__loaded;
      let refs = result.en.index.search('code');
      let posts = refs.map(({ ref }) => result.en.store[ref]);
      console.log(posts);
      setResults(posts);
    };
    if (window.__LUNR__) {
      fetchPosts();
    }
  }, []);

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SearchForm />
      <SearchResult />
    </Layout>
  );
};
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default Search;
