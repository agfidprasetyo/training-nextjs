import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { withApollo } from '../../../../lib/apollo';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useStyles from './styles';

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
  const styles = useStyles();

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
          {data.categoryList[0].products.items.map(product => (
            <div key={product.uid} className={styles.cardContainer}>
              <Link href={"/"+product.url_key} key={product.uid}>
                <Card sx={{ maxWidth: 345, height: 245 }}>
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      height="140"
                      classes={styles.imageContainer}
                      image={product.image.url}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>           
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default withApollo({ ssr: true })(CategoryDetail)