import axios from 'axios'
const Pagination = ({
  setFilms,
  setpagination,
  current_page,
  next_page_url,
  prev_page_url,
  setcurrent_page,
  setnext_page_url,
  setprev_page_url,
}) => {
  async function changePrevPage () {
    const response = await axios.get(`${prev_page_url}`)
    const data = response.data

    setprev_page_url(data.data.prev_page_url)

    //nextPage
    setcurrent_page(data.data.current_page)
    setnext_page_url(data.data.next_page_url)

    //update data
    setFilms(data.data.data)
    setpagination(data.data)
  }

  async function changeNextPage () {
    const response = await axios.get(`${next_page_url}`)
    const data = response.data

    setprev_page_url(data.data.prev_page_url)

    //nextPage
    setcurrent_page(data.data.current_page)
    setnext_page_url(data.data.next_page_url)

    //update data
    setFilms(prevResults => [...prevResults, ...data.data.data])
    setpagination(data.data)
  }

  return (
    <div className='pt-2 grid justify-items-center'>
      <nav aria-label='Page navigation example'>
        <ul className='inline-flex -space-x-px'>
          <button
            disabled={prev_page_url == null}
            onClick={changePrevPage}
            className='py-2 px-3 ml-0 leading-tight text-gray-500 bg-white  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Atrás
          </button>

          <li className='py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            {current_page}
          </li>
          <button
            disabled={next_page_url == null}
            onClick={changeNextPage}
            className='py-2 px-3 leading-tight text-gray-500 bg-white  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Siguiente
          </button>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
