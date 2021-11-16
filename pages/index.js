import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

export const getStaticProps = async () => {

  const result = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  return {
    props: { categories: result.data.categories }
  }
}

export default function Home({ categories, isLogin }) {
  console.log(isLogin)
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className="container">
        <h2 className="mb-4">All Categories</h2>
        <div className="row">
        {categories.map(category => (
          <Link href={"/category/"+category.strCategory} key={category.idCategory}>
            <a className="col-6">
              <div key={category.idCategory}>
                <div className="card m-2" style={{maxWidth: '540px'}} key={category.idCategory}>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src={category.strCategoryThumb} style={{maxWidth: '140px'}} alt={category.strCategory} />
                    <h5>{category.strCategory}</h5>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
        </div>
      </div>

    </div>
  )
}
