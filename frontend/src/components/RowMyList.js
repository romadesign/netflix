import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Movie from './Movie'

const RowMyList = ({ title, accountId }) => {
  console.log(accountId)

  const slider = useRef()
  const [movies, setMovies] = useState()

  //pagination config
  const [pagination, setpagination] = useState('')
  const [current_page, setcurrent_page] = useState('')
  const [next_page_url, setnext_page_url] = useState('')
  const [first_page_url, setfirst_page_url] = useState('')
  const [prev_page_url, setprev_page_url] = useState('')
  const [totalPage, settotalPage] = useState('')

  useEffect(() => {
    getFilmsAccount()
  }, [])

  async function getFilmsAccount () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/${accountId}/list`,
    )
    const data = response.data.data
    setpagination(response.data.data)
    setcurrent_page(response.data.data.current_page)
    setnext_page_url(response.data.data.next_page_url)
    setfirst_page_url(response.data.data.first_page_url)
    setprev_page_url(response.data.data.prev_page_url)
    settotalPage(response.data.data.total)
    setMovies(data.data)
  }

  async function sliderLeft () {
    const response = await axios.get(`${prev_page_url}`)
    const data = response.data
    setprev_page_url(data.data.prev_page_url)
    //nextPage
    setcurrent_page(data.data.current_page)
    setnext_page_url(data.data.next_page_url)
    //update data
    setMovies(data.data.data)
    setpagination(data.data)
    slider.current.scrollLeft = slider.current.scrollLeft - 1200
  }

  async function sliderRigth () {
    if (next_page_url !== null) {
      const response = await axios.get(`${next_page_url}`)
      const data = response.data
      setprev_page_url(data.data.prev_page_url)
      //nextPage
      setcurrent_page(data.data.current_page)
      setnext_page_url(data.data.next_page_url)
      //update data
      setMovies(prevResults => [...prevResults, ...data.data.data])
      setpagination(data.data)
      slider.current.scrollLeft = slider.current.scrollLeft + 1200
    }
  }

  return (
    <div>
      {movies !== undefined && movies.length >= 6 && (
        <h2 className=' absolute text-white font-bold md:text-xl pt-3 pl-6'>
          {title}
        </h2>
      )}

      <div className='relative flex items-center group w-[98%] pl-9'>
        {movies !== undefined && movies.length >= 6 ? (
          <>
            <MdChevronLeft
              onClick={sliderLeft}
              className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
              size={40}
            />
            <div
              ref={slider}
              id={'slider'}
              className='w-full h-full overflow-x-scroll text-center flex scroll-smooth scrollbar-hide justify-center'>
              {movies.map((item, id) => (
                <Movie key={id} item={item} />
              ))}
            </div>
            <MdChevronRight
              disabled={next_page_url == null}
              onClick={sliderRigth}
              className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
              size={40}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default RowMyList
