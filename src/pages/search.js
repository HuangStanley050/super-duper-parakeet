import React from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

const Search = ({ location, data }) => {
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
