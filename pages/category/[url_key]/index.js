import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import { withApollo } from '../../../lib/apollo';
import { useRouter } from 'next/router';

const CategoryDetail = () => {
  const { query } = useRouter();

  const query_gql = gql`{
    products(search: "") {
      total_count
      items {
        uid
        name
        image {
          url
        }
        url_key
      }
    }
  }`

  // const query_gql = gql`{
  //   products(filter: { category_uid: { eq: "${query.url_key}"}}) {
  //     total_count
  //     items {
  //       uid
  //       name
  //       url_key
  //     }
  //   }
  // }`;
  const response = useQuery(query_gql);
  const { loading, data, error } = response;
  console.log(response)
    return (
      <>
      <Head>
        <title>Category</title>
      </Head>
        <div className="container">
          <h2 className="mb-4">Product</h2>
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
                  <div className="spinner-border" />
                </div>
              ) : (
                <div className="row">
                  {data.products.items.map(product => (
                    <Link href={"/category/"+query.url_key+"/"+product.uid} key={product.uid}>
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
              )}
            </div>
        </div>
      </>
    )
}

export default withApollo({ ssr: true })(CategoryDetail)