import Head from 'next/head'
import Link from 'next/link'
import { gql, useQuery } from "@apollo/client";
import { withApollo } from '../lib/apollo';

const Home = () => {
  const query = 
    gql`{
      categoryList {
        url_key
        name
        children {
          url_key
          image
          name
        }
      }
    }`
  const response = useQuery(query);
  const { loading, data, error } = response;
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
        <div className="spinner-border" />
      </div>
    )
  }
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className="container">
        <h2 className="mb-4">All Categories</h2>
        <div className="row">
          <div className="row">
            {data.categoryList[0].children.map(category => (
              <Link href={category.url_key !== null ? "/"+category.url_key : '#'} key={category.uid}>
                <a className="col-6">
                  <div key={category.uid}>
                    <div className="card m-2 d-flex justify-content-center align-items-center flex-column" style={{maxWidth: '540px', height: 120}} key={category.uid}>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        {category.image && (
                          <img src={category.image} style={{maxWidth: '140px'}} alt={category.name} />
                        )}
                        <h5>{category.name}</h5>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
};

export default withApollo({ ssr: true })(Home);
