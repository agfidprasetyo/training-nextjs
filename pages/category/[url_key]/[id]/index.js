import React from 'react'
import Head from 'next/head'
import axios from 'axios'

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const result = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)

  return {
    props: { meal: result.data }
  }
}

function detailsFood({meal}) {
  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <div className="container">
          {meal.meals.map(me=>(
            <div key={me.idMeal} className="row align-items-center mb-4">
              <div className="col-lg-6 col-12">
                <h1 className="mb-4">{me.strCategory} {me.strArea}</h1>
                <img className="mb-4" src={me.strMealThumb} width={400}/>
              </div>
              <div className="col-lg-6 col-12">
                <p>{me.strInstructions}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default detailsFood