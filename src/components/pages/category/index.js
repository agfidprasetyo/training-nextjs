import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { withApollo } from '../../../../lib/apollo';

const CategoryDetail = () => {
  const { query } = useRouter();

  const query_gql = gql`
  query getProductList($urlKey: String) {
    categoryList(filters:{url_key: {eq: $urlKey}}) {
      url_key
      name
      products {
        __typename
        items {
          name
          image {
            url
          }
          url_key
        }
      }
      children {
        url_key
        name
      }
    }
  }`

  // const query_gql = gql`
  // query getCategoryProducts($categoryId: Int) {
  //   products(filter: { category_id: { eq: $categoryId}}) {
  //     total_count
  //     items {
  //       uid
  //       name
  //       url_key
  //     }
  //   }
  // }`;
  const response = useQuery(query_gql, {
    variables: {
      urlKey: query.slug[0]
    }
  });
  const { loading, data, error } = response;
  console.log(response)

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
        <div className="spinner-border" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>error {error}</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <div className="container">
        <h2 className="mb-4">Product</h2>
        <div className="row">
          <div className="row">
            {data.categoryList[0].products.items.map(product => (
              <Link href={"/"+product.url_key} key={product.uid}>
                <a className="col-6" >
                  <div>
                    <div className="card m-2">
                      <div className="card-body d-flex align-items-center justify-content-center flex-column">
                        {product.image.url && (
                          <img src={product.image.url} style={{maxWidth: '240px'}} alt={product.name} />
                        )}
                        <h3>{product.name}</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo({ ssr: true })(CategoryDetail)