import AppLayout from '@/components/Layouts/AppLayout'
import SubNavigation from '@/components/Layouts/SubNavigation'
import Movie from '@/components/Movie'
import axios from 'axios'
import Head from 'next/head'

const genre = ({ films }) => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>Genre</title>
        </Head>
        <SubNavigation title='Series Tv' />
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
  console.log(context.query.id)
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

export default genre
