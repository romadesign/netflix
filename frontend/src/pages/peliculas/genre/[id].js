import AppLayout from '@/components/Layouts/AppLayout'
import SubNavigation from '@/components/Layouts/SubNavigation'
import Movie from '@/components/Movie'
import { Api } from '@/hooks/api'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Genre = ({ films }) => {
  const { apiGetGenres } = Api()
  const [genres, setGenres] = useState()

  useEffect(() => {
    getGenres()
  }, [])

  async function getGenres () {
    apiGetGenres()
      .then(res => {
        const data = res.data.data
        setGenres(data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  return (
    <>
      <AppLayout>
        <Head>
          <title>Genre</title>
        </Head>
        <SubNavigation title='Películas' />
        <div className='h-[100vh] relative pt-20 bg-[#141414] '>
          <div className='bg-[#141414]'>
            <div className=' flex flex-wrap justify-center pt-10'>
              {films.data.map((item, id) => (
                <Movie key={id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

export const getServerSideProps = async context => {
  const category_id = 2
  const { data: films } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmscategory/${category_id}/filmsgenre/` +
      context.query.id,
  )

  return {
    props: {
      films,
    },
  }
}

export default Genre
