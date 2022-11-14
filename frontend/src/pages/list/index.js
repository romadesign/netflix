import AppLayout from '@/components/Layouts/AppLayout'
import Movie from '../../components/Movie'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { FaAngleDown } from 'react-icons/fa'
import Loading from '@/components/Loading'

const Lists = () => {
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var account_id = getCookie('accountId')
  }

  const [lists, setLists] = useState()

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

  useEffect(() => {
    getFilmsAccount()
  }, [account_id])

  async function getFilmsAccount () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/${account_id}/list`,
    )
    const data = response.data.data
    setpagination(response.data.data)
    setcurrent_page(response.data.data.current_page)
    setnext_page_url(response.data.data.next_page_url)
    setfirst_page_url(response.data.data.first_page_url)
    setprev_page_url(response.data.data.prev_page_url)
    settotalPage(response.data.data.total)
    setLists(data.data)
  }

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

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Mi Lista
        </h2>
      }>
      <Head>
        <title>Netflix - Lista</title>
      </Head>
      {lists !== undefined ? (
        <div className='h-[100vh] relative pt-20 bg-[#141414] '>
          <div className=' bg-[#141414]'>
            <div className='pl-10 text-white text-xl'>Mi lista</div>
            <div className=' flex flex-wrap justify-center'>
              {lists.map((item, id) => (
                <Movie key={id} item={item} />
              ))}
            </div>
            <div className=' flex flex-wrap justify-center'>
              {lists.length >= 6 && (
                <>
                  {next_page_url !== null && (
                    <FaAngleDown
                      onClick={handleSeeMore}
                      className='bg-[#141414] text-white cursor-pointer'
                      size={40}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  )
}
export default Lists
