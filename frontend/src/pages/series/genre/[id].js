import AppLayout from '@/components/Layouts/AppLayout'
import Movie from '@/components/Movie'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const searchGenre = ({ films }) => {
  const [genres, setGenres] = useState()

  useEffect(() => {
    getGenres()
  }, [])

  async function getGenres () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`,
    )
    const data = response.data.data
    setGenres(data)
  }
  console.log(films)
  return (
    <>
      <AppLayout>
        <Head>
          <title>Genre</title>
        </Head>
        <div>
          <div>
            Series TV
            <div>
              <div className=''>
                <div className=''>
                  <select className='text-sm text-white bg-[#2e2e2e87] pl-2 pr-2 border-[1px] w-[100px] border-inherit'>
                    <option className='text-white  text-sm bg-[black]' selected>
                      Géneros
                    </option>
                    {genres !== undefined &&
                      genres.map(genre => (
                        <option
                          onClick={e =>
                            router.push(
                              '/series/genre/[id]',
                              `/series/genre/${genre?.id}`,
                            )
                          }
                          className='text-white  text-sm bg-[black]'
                          value={genre.id}>
                          {genre.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  const category_id = 1
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

export default searchGenre
