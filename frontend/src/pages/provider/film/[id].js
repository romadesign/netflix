import { useRouter } from 'next/router'
import { useEffect, useState, useSyncExternalStore } from 'react'
import axios from 'axios'
import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'

const FilmDetail = ({ films}) => {

    const [film, setFilm] = useState(films.data)

    console.log(film)

  return (
   <AppLayout>
     <Head>
        <title>Film update</title>
      </Head>
     <div className="py-12">
      <h1>{film.title}</h1>
    </div>
   </AppLayout>
  )
}

export const getServerSideProps = async context => {
  const { data: films } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film/` + context.query.id,
  )
  return {
    props: {
        films,
    },
  }
}
export default FilmDetail
