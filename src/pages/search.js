import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

const Search = ({ location, data }) => {
  const [results, setResults] = useState([]);
  const searchQuery =
    new URLSearchParams(location.search).get('keywords') || '';
  useEffect(() => {
    const fetchPosts = async searchQuery => {
      let result = await window.__LUNR__.__loaded;
      let refs = result.en.index.search(searchQuery);
      let posts = refs.map(({ ref }) => result.en.store[ref]);
      console.log(posts);
      setResults(posts);
    };
    if (searchQuery && window.__LUNR__) {
      fetchPosts(searchQuery);
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
