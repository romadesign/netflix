import Head from 'next/head'
import axios from 'axios'
import AppLayout from '@/components/Layouts/AppLayout'
import Movie from '../../components/Movie'
import { useAuth } from '@/hooks/auth'
import styles from '../../../styles/banner.module.css'
import { useEffect, useMemo, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import { countries } from '@/components/countrieList'
import { FaAngleDown } from 'react-icons/fa'
import Loading from '@/components/Loading'
import { list } from 'postcss'
import { Api } from '@/hooks/api'

const Explore = () => {
  const { getCookie } = useAuth()
  const { apiGetListExplore, apiGetSearchFilmCountry } = Api()

  if (typeof window !== 'undefined') {
    var account_id = getCookie('accountId')
    var token = getCookie('token')
  }

  const [lists, setLists] = useState([])

  const [pagination, setpagination] = useState('')
  const [current_page, setcurrent_page] = useState('')
  const [next_page_url, setnext_page_url] = useState('')
  const [first_page_url, setfirst_page_url] = useState('')
  const [prev_page_url, setprev_page_url] = useState('')
  const [totalPage, settotalPage] = useState('')

  const [countrySelected, setCountrySelected] = useState()
  const [statusSeeMore, setStatusSeeMore] = useState(false)
  const [statusSeeMoreCountry, setStatusSeeMoreCountry] = useState(false)
  const [hideResetLists, setHideResetLists] = useState(false) //Escondiendo object cuando hacemos algun filtro

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function getFilmsPageExplore () {
    setStatusSeeMore(!true)
    setStatusSeeMoreCountry(!false)
    setHideResetLists(!false)

    //get API
    apiGetListExplore()
      .then(res => {
        const data = res.data.data
        setpagination(res.data.data)
        setcurrent_page(res.data.data.current_page)
        setnext_page_url(res.data.data.next_page_url)
        setfirst_page_url(res.data.data.first_page_url)
        setprev_page_url(res.data.data.prev_page_url)
        settotalPage(res.data.data.total)
        setLists(data.data)
        document.getElementById('countries').selectedIndex = 0
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  useEffect(() => {
    getFilmsPageExplore()
  }, [])

  async function handleSeeMore () {
    if (next_page_url !== null) {
      setStatusSeeMore(!true)
      setStatusSeeMoreCountry(!false)
      setHideResetLists(!true)
      const response = await axios.get(`${next_page_url}`)
      const data = response.data
      setprev_page_url(data.data.prev_page_url)
      //nextPage
      setcurrent_page(data.data.current_page)
      setnext_page_url(data.data.next_page_url)
      //update data
      setLists(prevResults => [...prevResults, ...data.data.data])
      setpagination(data.data)
    }
  }

  async function handleChangeCountry (e) {
    setCountrySelected(e)
    setStatusSeeMore(!false)
    setStatusSeeMoreCountry(!true)
    setHideResetLists(!true)

    //get API
    apiGetSearchFilmCountry(e)
      .then(res => {
        const data = res.data
        setprev_page_url(data.prev_page_url)
        //nextPage
        setcurrent_page(data.current_page)
        setnext_page_url(data.next_page_url)
        //update data
        setLists(res.data.data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  async function handleSeeMoreCountry () {
    console.log(next_page_url)
    if (next_page_url !== null) {
      const response = await axios.get(`${next_page_url}`)
      const data = response.data
      setprev_page_url(data.prev_page_url)
      //nextPage
      setcurrent_page(data.current_page)
      setnext_page_url(data.next_page_url)
      //update data
      setLists(prevResults => [...prevResults, ...data.data])
    }
  }

  return (
    <>
      <AppLayout
        header={
          <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
            Explorar por idiomas
          </h2>
        }>
        <Head>
          <title>Netflix</title>
        </Head>
        {lists !== undefined ? (
          <div className='h-[100vh] relative pt-20 bg-[#141414] '>
            <div className='bg-[#141414]'>
              <div
                className={`${
                  !isScrolled
                    ? 'content_sub_navbar absolute t-0 z-10 w-full '
                    : styles.subnavbar
                }`}>
                <div className='flex flex-wrap pt-4 pb-10 gap-4 items-center '>
                  <div className='pl-10 text-white text-xl'>
                    Explorar por idiomas
                  </div>
                  <div className='text-white text-sm'>
                    Selecciona tus preferencias
                  </div>
                  <div className=''>
                    <select
                      onChange={e => handleChangeCountry(e.target.value)}
                      id='countries'
                      className='text-sm text-white bg-[#2e2e2e87] pl-2 pr-2 border-[1px] w-[130px] border-inherit'>
                      <option
                        className='text-white text-sm bg-[black]'
                        disabled
                        selected>
                        Todos
                      </option>
                      {countries.map(country => (
                        <option value={country?.name}>{country?.name}</option>
                      ))}
                    </select>
                  </div>
                  {!hideResetLists && (
                    <button
                      onClick={() => getFilmsPageExplore()}
                      className='bg-transparent hover:bg-white-500 text-white font-semibold hover:text-white px-4 border border-white-500 '>
                      Reset
                    </button>
                  )}
                </div>
              </div>
              <div className=' flex flex-wrap justify-center pt-10'>
                {lists.map((item, id) => (
                  <Movie key={id} item={item} />
                ))}
              </div>
              {next_page_url !== null ? (
                <div className='flex justify-center pb-3'>
                  {statusSeeMore !== true && (
                    <FaAngleDown
                      disabled={next_page_url == null}
                      onClick={handleSeeMore}
                      className='bg-[#141414] text-white cursor-pointer'
                      size={40}
                    />
                  )}
                  {statusSeeMoreCountry !== true && (
                    <FaAngleDown
                      disabled={next_page_url == null}
                      onClick={handleSeeMoreCountry}
                      className='bg-[#141414] text-white cursor-pointer'
                      size={40}
                    />
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </AppLayout>
    </>
  )
}

export default Explore
