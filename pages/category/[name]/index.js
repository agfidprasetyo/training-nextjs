import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

export const getStaticPaths = async () => {
    const result = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')

    const paths = result.data.categories.map(category => {
        return {
            params: { name: category.strCategory.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const name = context.params.name
    const result = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+name)
  
    return {
      props: { foods: result.data.meals, path:name }
    }
  }

function categoryDetail({foods, path}) {
    return (
      <>
      <Head>
        <title>Category</title>
      </Head>
        <div className="container">
          <h2 className="mb-4">Category {path}</h2>
            <div className="row">
              {foods.map(food => (
                <Link href={"/category/"+path+"/"+food.idMeal} key={food.idMeal}>
                  <a className="col-6" >
                    <div>
                      <div className="card m-2">
                        <div className="card-body d-flex align-items-center justify-content-center flex-column">
                          <img src={food.strMealThumb} style={{maxWidth: '240px'}} alt={food.strMeal} />
                          <h3>{food.strMeal}</h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
        </div>
      </>
    )
}

export default categoryDetail