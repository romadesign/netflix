import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import Pagination from '@/components/BackOfficeProvider/Pagination'
import { FaStar } from 'react-icons/fa'
import { Api } from '@/hooks/api'
const Admin = () => {
  const router = useRouter()
  const { getCookie } = useAuth()
  const {
    apiDeleteFilm,
    apiDeleteFilmsAll,
    apiGetMovieProvider,
    apiGetImage,
  } = Api()

  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  //redirect page si no es provedor
  if (typeof window !== 'undefined') {
    var userTypeCookie = getCookie('type')
    console.log(userTypeCookie)
    var userTypeId = getCookie('id')
  }
  const [hideOption, setHideOption] = useState(false) //Escondiendo object cuando hacemos algun filtro

  const [getcategories, setGetCategories] = useState([]) //GetCategories
  const [films, setFilms] = useState([])
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
    apiGetMovieProvider(userTypeId)
      .then(res => {
        const data = res.data.data
        setpagination(res.data.data)
        setcurrent_page(res.data.data.current_page)
        setnext_page_url(res.data.data.next_page_url)
        setfirst_page_url(res.data.data.first_page_url)
        setprev_page_url(res.data.data.prev_page_url)
        settotalPage(res.data.data.total)
        if (data.data.length > 0) {
          if (films !== undefined) {
            setFilms(data.data)
          }
        }
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  //   useEffect(() => {
  //     getCategories()
  //   }, [])

  //   //get categories
  //   function getCategories () {
  //     apiGetCategories()
  //       .then(res => {
  //         const data = res.data.data
  //         setGetCategories(data)
  //       })
  //       .catch(error => {
  //         console.log(error, 'entro') // "oh, no!"
  //       })
  //   }

  function handleDelete (id) {
    apiDeleteFilm(id)
      .then(function (res) {
        getFilms()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // const handleSelectChecbox = (id) => {
  //   setSelectedIds(
  //     selectedIds.indexOf(id.toString()) === -1 ?
  //       [...selectedIds, id.toString()] : selectedIds.filter((x) => x !== id.toString()))
  // }

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(films.map(li => li.id.toString()))
    if (isCheckAll) {
      setIsCheck([])
    }
  }

  const handleClick = e => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id))
    }
  }

  async function handleDeletes () {
    const ids = isCheck
    apiDeleteFilmsAll(ids)
      .then(function (response) {
        console.log(response.data.message)
        restart()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //filter
  async function captureFilterValue (value) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${value}`,
    )
    const data = response.data
    setFilms(data)
  }

  function restart () {
    setIsCheck([])
    setIsCheckAll(!true)
    getFilms()
    setHideOption(!true)
  }

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
          <div className='pt-3 flex justify-between'>
            <NavLink href='/provider/create'>
              <button className='transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4'>
                New film
              </button>
            </NavLink>
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => restart()}>
                Restart list
              </button>
              {isCheck.length >= 1 && (
                <button
                  className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                  onClick={() => handleDeletes()}>
                  DeleteAll
                </button>
              )}
            </div>
          </div>
          {films.length > 0 && (
            <div>
              <div className='pt-3'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' className='p-4'>
                        <div className='flex items-center'>
                          <input
                            checked={isCheckAll}
                            onChange={handleSelectAll}
                            name='selectAll'
                            id='selectAll'
                            type='checkbox'
                            className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
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
                    <>
                      {films.map(film => (
                        <tr
                          key={film?.id}
                          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                          <>
                            <td className='p-4 w-4'>
                              <div className='flex items-center'>
                                <input
                                  checked={isCheck.includes(
                                    film?.id.toString(),
                                  )}
                                  onChange={handleClick}
                                  name={film?.id}
                                  id={film?.id}
                                  type='checkbox'
                                  className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                              </div>
                            </td>
                            <td className='py-4 px-6'> {film?.id}</td>
                            <td className='py-4 px-6'>
                              <img
                                className='bg-cover w-20 scale-75 m-auto '
                                src={apiGetImage(film?.backdrop_path)}
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
                              {/* {film?.rating} */}
                              <div className='flex items-center mb-5'>
                                {[...Array(film?.rating || 5)].map(star => {
                                  return <FaStar color='#ffc107' />
                                })}
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
                  </tbody>
                </table>
              </div>
              {/* Escondiendo cuando hacemos filtro */}
              {/* Pagination */}
              {!hideOption && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default Admin
