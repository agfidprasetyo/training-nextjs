import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { withApollo } from '../lib/apollo';
import CategoryDetail from '../src/components/pages/category';
import ProductDetail from '../src/components/pages/product';


const Resolver = () => {
  const { query } = useRouter();
  const query_gql =  gql`
  query getResolver($urlKey: String!) {
    urlResolver(url: $urlKey) {
        id
        redirectCode
        type
    }
  }`;

  const response = useQuery(query_gql, {
    variables: {
      urlKey: `${query.slug[0]}.html`
    }
  });

  const { loading, data, error } = response;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
        <div className="spinner-border" />
      </div>
    )
  }
  
  if (data.urlResolver === null) {
    return (
      <div>
        <h1>error page not found</h1>
      </div>
    )
  } else if (data.urlResolver.type === 'CATEGORY') {
    return (
      <CategoryDetail />
    )
  } else if (data.urlResolver.type === 'PRODUCT') {
    return (
      <ProductDetail />
    )
  }

  if (error) {
    return (
      <div>
        <h1>error {error}</h1>
      </div>
    )
  }

}

export default withApollo({ ssr: true })(Resolver)