import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import Movie from './Movie'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading'
import { Api } from '@/hooks/api'

const Row = ({ title, category_id, genre_id, rowId }) => {

  const { getCookie } = useAuth()
  const { apiGetFilmsByCategorieAndGenre, apiGetFilmsByGenre } = Api()

  const token = getCookie('token')
  const router = useRouter()

  const slider = useRef()
  const [movies, setMovies] = useState()

  useEffect(() => {
    getFilms()
  }, [])

  async function getFilms () {
    const abortController = new AbortController()
    if (router.pathname === '/films') {
      apiGetFilmsByGenre(
        genre_id,
        { headers: { Authorization: `Bearer ${token}` } },
        { signal: abortController.signal },
      )
        .then(res => {
          const data = res.data.data
          setMovies(data)
        })
        .catch(error => {
          console.log(error, 'entro') // "oh, no!"
        })
    } else if (
      router.pathname === '/series' ||
      router.pathname === '/peliculas'
    ) {
      apiGetFilmsByCategorieAndGenre(
        category_id,
        genre_id,
        { headers: { Authorization: `Bearer ${token}` } },
        { signal: abortController.signal },
      )
        .then(res => {
          const data = res.data.data
          setMovies(data)
        })
        .catch(error => {
          console.log(error, 'entro') // "oh, no!"
        })
    }
    return () => {
      abortController.abort()
      setTimeout(() => abortController.abort(), 6000)
    }
  }

  const sliderLeft = () => {
    // var slider = document.getElementById('slider' + rowId)
    // slider.scrollLeft = slider.scrollLeft - 1200
    slider.current.scrollLeft = slider.current.scrollLeft - 1200
  }

  const sliderRigth = () => {
    // var slider = document.getElementById('slider' + rowId)
    // slider.scrollLeft = slider.scrollLeft + 1200
    slider.current.scrollLeft = slider.current.scrollLeft + 1200
  }

  //Other options pagination
  //   async function sliderLeft () {
  //     const response = await axios.get(`${prev_page_url}`)
  //     const data = response.data
  //     setprev_page_url(data.data.prev_page_url)
  //     //nextPage
  //     setcurrent_page(data.data.current_page)
  //     setnext_page_url(data.data.next_page_url)
  //     //update data
  //     setMovies(data.data.data)
  //     setpagination(data.data)
  //     slider.current.scrollLeft = slider.current.scrollLeft - 1200
  //   }

  //   async function sliderRigth () {
  //     if (next_page_url !== null) {
  //       const response = await axios.get(`${next_page_url}`)
  //       const data = response.data
  //       setprev_page_url(data.data.prev_page_url)
  //       //nextPage
  //       setcurrent_page(data.data.current_page)
  //       setnext_page_url(data.data.next_page_url)
  //       //update data
  //       setMovies(prevResults => [...prevResults, ...data.data.data])
  //       setpagination(data.data)
  //       slider.current.scrollLeft = slider.current.scrollLeft + 1200
  //     }
  //   }

  return (
    <div className=''>
      <h2 className=' absolute text-white font-bold md:text-xl pt-3 pl-6 '>
        {title}
      </h2>
      <div className='relative flex items-center group pl-9'>
        {movies !== undefined ? (
          <>
            <MdChevronLeft
              onClick={sliderLeft}
              className='bg-white rounded-full absolute top[10rem] opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
              size={40}
            />
            <div
              ref={slider}
              //id={'slider' + rowId}
              className='w-full h-full overflow-x-scroll text-center flex scroll-smooth scrollbar-hide justify-center'>
              {movies.map((item, id) => (
                <Movie key={id} item={item} />
              ))}
            </div>
            <MdChevronRight
              //   disabled={next_page_url == null}
              onClick={sliderRigth}
              className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
              size={40}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Row
