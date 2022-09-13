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

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  console.log(isCheck)
  //redirect page si no es provedor
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var userTypeCookie = getCookie('type')
  }
  const [hideOption, setHideOption] = useState(false) //Escondiendo object cuando hacemos algun filtro
  const [formatText, setFormatText] = useState()

  const [getcategories, setGetCategories] = useState([]) //GetCategories
  const [films, setFilms] = useState([])
  const [countryFilms, setCountryFilms] = useState([])
  const [filmsFilter, setFilmsFilter] = useState([])

  const [selectAbc, setSelectAbc] = useState()
  //pagination config
  const [pagination, setpagination] = useState('')
  const [current_page, setcurrent_page] = useState('')
  const [next_page_url, setnext_page_url] = useState('')
  const [first_page_url, setfirst_page_url] = useState('')
  const [prev_page_url, setprev_page_url] = useState('')
  const [totalPage, settotalPage] = useState('')

  //delete data ids
  const [selectedIds, setSelectedIds] = useState([]);
  console.log(selectedIds)
  
  useEffect(() => {
    getFilms()
    userTypeCookie == 'client'
      ? router.push('/browse')
      : router.push('/provider')
  }, [])

  async function getFilms() {
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

  async function getCategories() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    )
    const data = response.data.data
    return setGetCategories(data)
  }

  async function handleDelete(id) {
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

  // const handleSelectChecbox = (id) => {
  //   setSelectedIds(
  //     selectedIds.indexOf(id.toString()) === -1 ? 
  //       [...selectedIds, id.toString()] : selectedIds.filter((x) => x !== id.toString()))
  // }

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(films.map((li) => li.id.toString()));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  async function handleDeletes() {
    const ids = selectedIds;
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film/${ids}/deleteall`)
      .then(function (response) {
        console.log(response.data.message)
        getFilms()
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  //filter
  async function captureFilterValue(value) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${value}`,
    )
    const data = response.data
    setFilms(data)
  }

  async function handleChangeCountry(e) {
    setFormatText(e)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${e}`,
    )
    const data = response.data
    setHideOption(!false)
    setFilms(data)
  }

  function restart() {
    document.getElementById("countries").selectedIndex = 0;
    getFilms()
    setHideOption(!true)
  }

  return (
    <AppLayout>
      <Head>
        <title>Dashboard provider</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              Bienvenido, acá puedes realizar funciones como crear, editar,
              elimnar.
            </div>
          </div>
          {/* filter */}
          {/* <div>{
            countries.map(country => (
              <button
                key={country?.id}
                onClick={() => captureFilterValue(country?.name)}
                type="button"
                className="py-1 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {country.name}
              </button>
            ))}
          </div> */}
          <div className="pt-3 flex justify-between">
            <NavLink href="/provider/create">
              <button className="transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4">
                New film
              </button>
            </NavLink>
            {/* Filter select */}
            <div>
              <select
                onChange={(e) => handleChangeCountry(e.target.value)}
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Selecciona una país</option>
                {countries.map(country => (
                  <option value={country?.name}>{country?.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => restart()}>
                Restart list
              </button>
              <button
                class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => handleDeletes()}>
                DeleteAll
              </button>
            </div>
            {/* Escondiendo cuando hacemos filtro */}
            {/* Pagination */}
            {!hideOption &&
              <div className="flex justify-between content-center items-center">
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
                <div className="pt-2 grid justify-items-center">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold  px-2.5 py-3  dark:bg-indigo-200 dark:text-indigo-900">
                    {' '}
                    Films: {totalPage}
                  </span>
                </div>
              </div>

            }
          </div>
          {/* show films */}
          <div className="pt-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                       checked={isCheckAll}
                       onChange={handleSelectAll}
                       name="selectAll"
                       id="selectAll"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    img
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Titulo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Categoria
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Countries
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Rating
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {films.map(film => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                     >
                      <>
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <input
                              key={film?.id}
                              checked={isCheck.includes(film?.id.toString())}
                              onChange={handleClick}
                              name={film?.id}
                              id={film?.id}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />

                          </div>
                        </td>
                        <td className="py-4 px-6"> {film?.id}</td>
                        <td className="py-4 px-6">
                          <img
                            className="bg-cover w-20 scale-75 m-auto "
                            src={film?.poster_path}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                          />
                        </td>
                        <td className="py-4 px-6">{film?.title}</td>

                        <td className="py-4 px-6">
                          {getcategories.map(cat =>
                            cat.id == film.categorie_id ? cat.title : '',
                          )}
                        </td>

                        <td className="py-4 px-6">{film?.country}</td>
                        <td className="py-4 px-6">
                          {film?.rating}
                          <div className="flex items-center mb-5">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <title>First star</title>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {/* <Link href={`/provider/film/${film?.id}`}> iR </Link> */}
                          <button
                            onClick={e =>
                              router.push(
                                '/provider/film/[id]',
                                `/provider/film/${film?.id}`,
                              )
                            }
                            className="transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(film?.id)}
                            className="transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 text-white font-bold py-2 px-4">
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
        </div>
      </div>
    </AppLayout>
  )
}

export default Admin
