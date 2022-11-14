import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Pagination from '@/components/BackOfficeProvider/Pagination'
import { countries } from '@/components/countrieList'

const Admin = () => {
  const router = useRouter()

  //redirect page si no es provedor
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var userTypeCookie = getCookie('type')
  }

  const [getcategories, setGetCategories] = useState([]) //GetCategories

  const [films, setFilms] = useState([])

  const [filmsFilter, setFilmsFilter] = useState([])

  const [selectAbc, setSelectAbc] = useState()

  //pagination config
  const [pagination, setpagination] = useState('')
  const [current_page, setcurrent_page] = useState('')
  const [next_page_url, setnext_page_url] = useState('')
  const [first_page_url, setfirst_page_url] = useState('')
  const [prev_page_url, setprev_page_url] = useState('')
  const [totalPage, settotalPage] = useState('')

  useEffect(() => {
    getFilms()
    userTypeCookie == 'client'
      ? router.push('/browse')
      : router.push('/provider')
  }, [])

  async function getFilms () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/films`,
    )
    const data = response.data.data
    setpagination(response.data.data)
    setcurrent_page(response.data.data.current_page)
    setnext_page_url(response.data.data.next_page_url)
    setfirst_page_url(response.data.data.first_page_url)
    setprev_page_url(response.data.data.prev_page_url)
    settotalPage(response.data.data.total)
    setFilms(data.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    )
    const data = response.data.data
    return setGetCategories(data)
  }

  async function handleDelete (id) {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film/${id}/delete`)
      .then(function (response) {
        // console.log(response.data.message)
        getFilms()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //filter
  const captureFilterValue = value => {
    getFilms()
    setSelectAbc(value)
  }

  useEffect(() => {
    if (films !== undefined) {
      let recor = films.filter(a => {
        const data = a.country === selectAbc
        // console.log('data', data)
        if (data === true) {
          return data
        }
      })
      setFilmsFilter(recor)
    }
  }, [selectAbc])
  return (
    <AppLayout>
      <Head>
        <title>Dashboard provider</title>
      </Head>
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              Bienvenido, acá puedes realizar funciones como crear, editar,
              elimnar.
            </div>
          </div>
          {/* filter */}
          <div>
            {countries.map(country => (
              <button
                key={country?.id}
                onClick={() => captureFilterValue(country?.name)}
                type='button'
                className='py-1 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                {country.name}
              </button>
            ))}
          </div>
          <div>
            {filmsFilter.map(film => (
              <div>{film.country}</div>
            ))}
          </div>
          <div className='pt-3 flex justify-between'>
            <NavLink href='/provider/create'>
              <button className='transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4'>
                New film
              </button>
            </NavLink>

            {/* Pagination */}
            <div className='flex justify-between content-center items-center'>
              <Pagination
                pagination={pagination}
                current_page={current_page}
                next_page_url={next_page_url}
                first_page_url={first_page_url}
                prev_page_url={prev_page_url}
                setpagination={setpagination}
                setcurrent_page={setcurrent_page}
                setnext_page_url={setnext_page_url}
                setfirst_page_url={setfirst_page_url}
                setprev_page_url={setprev_page_url}
                setFilms={setFilms}
              />
              <div className='pt-2 grid justify-items-center'>
                <span className='bg-indigo-100 text-indigo-800 text-xs font-semibold  px-2.5 py-3  dark:bg-indigo-200 dark:text-indigo-900'>
                  {' '}
                  Films: {totalPage}
                </span>
              </div>
            </div>
          </div>
          {/* show films */}
          <div className='pt-3'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input
                        id='checkbox-all-search'
                        type='checkbox'
                        className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label for='checkbox-all-search' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    id
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    img
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Titulo
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Categoria
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Countries
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Rating
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {filmsFilter.length === 0 ? (
                  <>
                    {films.map(film => (
                      <tr
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        key={film?.id}>
                        <>
                          <td className='p-4 w-4'>
                            <div className='flex items-center'>
                              <input
                                id='checkbox-table-search-1'
                                type='checkbox'
                                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                              />
                              <label
                                for='checkbox-table-search-1'
                                className='sr-only'>
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className='py-4 px-6'> {film?.id}</td>
                          <td className='py-4 px-6'>
                            <img
                              className='bg-cover w-20 scale-75 m-auto '
                              src={film?.poster_path}
                              alt='Picture of the author'
                              width={500}
                              height={500}
                            />
                          </td>
                          <td className='py-4 px-6'>{film?.title}</td>

                          <td className='py-4 px-6'>
                            {getcategories.map(cat =>
                              cat.id == film.categorie_id ? cat.title : '',
                            )}
                          </td>

                          <td className='py-4 px-6'>{film?.country}</td>
                          <td className='py-4 px-6'>
                            {film?.rating}
                            <div className='flex items-center mb-5'>
                              <svg
                                aria-hidden='true'
                                className='w-5 h-5 text-yellow-400'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'>
                                <title>First star</title>
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                              </svg>
                            </div>
                          </td>
                          <td className='py-4 px-6'>
                            {/* <Link href={`/provider/film/${film?.id}`}> iR </Link> */}
                            <button
                              onClick={e =>
                                router.push(
                                  '/provider/film/[id]',
                                  `/provider/film/${film?.id}`,
                                )
                              }
                              className='transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4'>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(film?.id)}
                              className='transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 text-white font-bold py-2 px-4'>
                              Delete
                            </button>
                          </td>
                        </>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filmsFilter.map(film => (
                      <tr
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        key={film?.id}>
                        <>
                          <td className='p-4 w-4'>
                            <div className='flex items-center'>
                              <input
                                id='checkbox-table-search-1'
                                type='checkbox'
                                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                              />
                              <label
                                for='checkbox-table-search-1'
                                className='sr-only'>
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className='py-4 px-6'> {film?.id}</td>
                          <td className='py-4 px-6'>
                            <img
                              className='bg-cover w-20 scale-75 m-auto '
                              src={film?.poster_path}
                              alt='Picture of the author'
                              width={500}
                              height={500}
                            />
                          </td>
                          <td className='py-4 px-6'>{film?.title}</td>

                          <td className='py-4 px-6'>
                            {getcategories.map(cat =>
                              cat.id == film.categorie_id ? cat.title : '',
                            )}
                          </td>

                          <td className='py-4 px-6'>{film?.country}</td>
                          <td className='py-4 px-6'>
                            {film?.rating}
                            <div className='flex items-center mb-5'>
                              <svg
                                aria-hidden='true'
                                className='w-5 h-5 text-yellow-400'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'>
                                <title>First star</title>
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                              </svg>
                            </div>
                          </td>
                          <td className='py-4 px-6'>
                            {/* <Link href={`/provider/film/${film?.id}`}> iR </Link> */}
                            <button
                              onClick={e =>
                                router.push(
                                  '/provider/film/[id]',
                                  `/provider/film/${film?.id}`,
                                )
                              }
                              className='transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4'>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(film?.id)}
                              className='transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 text-white font-bold py-2 px-4'>
                              Delete
                            </button>
                          </td>
                        </>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Admin
