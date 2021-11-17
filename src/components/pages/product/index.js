import React from 'react'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { withApollo } from '../../../../lib/apollo';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// export const getServerSideProps = async (context) => {
//   const id = context.params.id
//   const result = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)

//   return {
//     props: { meal: result.data }
//   }
// }

const DetailsFood = () => {
  const { query } = useRouter();
  console.log(query)

  const query_gql = gql`
  query getProductDetail($urlKey: String) {
    products(filter: {
      url_key: {
        eq: $urlKey
      }
    }) {
      items{
        uid
        name
        brand
        special_price
        description{
          html
        }
        qty_available
        image{
          url
        }
      }
    }
  }`
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
        <title>Detail</title>
      </Head>
      <div className="container">
        <div>
          {data.products.items.map(product=>(
            <div key={product.uid} className="row align-items-center mb-4">
              <div className="col-lg-6 col-12">
                <img className="mb-4" src={product.image.url} width={400}/>
              </div>
              <div className="col-lg-6 col-12">
                <span className="badge bg-warning text-dark p-2">{product.brand}</span>
                <h1 className="mb-4">{product.name}</h1>
                <h2>Rp {product.special_price}</h2>
                <p dangerouslySetInnerHTML={{__html:product.description.html}} />
                <AddShoppingCartIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default withApollo({ ssr: true })(DetailsFood)