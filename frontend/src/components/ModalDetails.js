import { useEffect, useState } from 'react'
import {
  FaCheckCircle,
  FaPlay,
  FaPlus,
  FaRegSmileBeam,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaStar,
} from 'react-icons/fa'

const ModalDetails = ({
  movie,
  setShowModal,
  onMouse,
  addListMovie,
  deleteListMovieId,
  movieOptionsStatus,
  movieOptions,
}) => {
  const [icons, setIcons] = useState(false)
  const onMouseLeave = () => setIcons(false)

  const closeModal = () => {
    setShowModal(!true)
  }

  const showIcons = () => {
    setIcons(!false)
  }

  return (
    <div className='bg-[#000000e0]  fixed overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0  md:h-full  sm:w-full md:w-full grid items-center rounded-lg m-auto  '>
      <div className='relative xs:w-[300px]  sm:w-[400px] md:w-[750px]  h-[100vh] m-auto grid items-center '>
        <div
          onMouseLeave={onMouse}
          className='relative bg-white rounded-lg shadow dark:bg-[#141414] shadow-lg shadow-gray-500/300 md:w-[750px] '>
          <div className=''>
            <button
              onClick={() => {
                closeModal()
              }}
              type='button'
              className='absolute z-10 top-3 right-5 text-gray-400   rounded-[50px] text-sm ml-auto inline-flex items-center '>
              <svg
                aria-hidden='true'
                className='w-11 h-11 bg-[black] rounded-[50px] '
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='pb-3 text-center  bg-[#020202]'>
              <div className=' rounded-lg'>
                <iframe
                  className=' w-[100%] h-[340px] rounded-lg text-center'
                  src='https://www.youtube.com/embed/Bh8O9F-5pUg'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
              </div>
              {/* <div className="flex justify-between p-4 items-center relative top-[-55px] bg-[#141414] "> */}
              <div className='flex justify-between pl-10 pr-10 pt-7 items-center '>
                <div className='flex justify-between items-center'>
                  <div className='flex justify-between'>
                    <FaPlay className='text-3xl cursor-pointer text-slate-300' />
                    <div>
                      <div className='flex justify-center flex-wrap'>
                        {!movieOptionsStatus !== true ? (
                          <FaPlus
                            className='ml-3 text-3xl cursor-pointer text-slate-300'
                            title={movieOptions}
                            onClick={() => {
                              addListMovie(movie.film_id)
                            }}></FaPlus>
                        ) : (
                          <FaCheckCircle
                            className='ml-2 mr-2 text-2xl cursor-pointer text-slate-300'
                            title={movieOptions}
                            onClick={() => deleteListMovieId(movie.film_id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex justify-between'
                    onMouseEnter={showIcons}
                    onMouseLeave={onMouseLeave}>
                    {!icons ? (
                      <div>
                        <FaRegThumbsUp className=' ml-2 mr-2 text-2xl cursor-pointer text-slate-300 ' />
                      </div>
                    ) : (
                      <div className='flex justify-between bg-[#090909] h-8 rounded-[15px] left-[-40px] h-[38px] relative items-center'>
                        <FaRegThumbsDown className=' ml-2 mr-2 text-2xl cursor-pointer text-slate-300' />
                        <FaRegThumbsUp className=' ml-2 mr-2 text-2xl cursor-pointer text-slate-300 ' />
                        <FaRegSmileBeam className=' ml-2 mr-2 text-2xl cursor-pointer text-slate-300' />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-center pl-10 pr-10 pt-7 items-center'>
                {[...Array(movie.rating || 5)].map(star => {
                  return <FaStar color='#ffc107' />
                })}
              </div>
              <div className='md:flex md:flex-row pl-10 pr-10 pt-7'>
                <div className='basis-2/3 text-left'>
                  <h3 className='text-xl text-left font-extrabold text-[#ffffff] dark:text-gray-200'>
                    {movie.title}
                  </h3>
                  <span className='text-sm font-extralight text-[#ffffff] dark:text-gray-200'>
                    {movie.description}
                  </span>
                </div>
                <div className='basis-1/3 text-left'>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    {/* Reparto: <p className="text-base  text-[#ffffff] dark:text-gray-200">{JSON.parse(movie.protagonists).toString().split('"')}</p> */}
                    Reparto:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {
                        <>
                          {movie.protagonists.map(protagonist => (
                            <span> {protagonist}</span>
                          ))}
                        </>
                      }
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Géneros:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.genre.map(genres => (
                        <span> {genres}</span>
                      ))}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Pertenece a:
                    <p className='text-base text-[#ffffff] dark:text-gray-200'>
                      {movie.director}
                    </p>
                  </span>
                </div>
              </div>
              <div className='md:flex md:flex-row pl-10 pr-10 pt-7'>
                <div className='basis-2/3 text-left'>
                  <h4 className='text-xl font-extrabold text-[#ffffff] dark:text-gray-200 text-left  pt-2'>
                    Acerca de Los {movie.title}
                  </h4>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Creada por:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.director}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Premios:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.award}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    País:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.country}
                    </p>
                  </span>
                </div>
                <div className='basis-2/3 text-left'>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Duración:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.duration}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Estreno:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.premiere}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Productora:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.producer}
                    </p>
                  </span>
                  <span className='text-xs  text-gray-400 dark:text-gray-450'>
                    Estudio:
                    <p className='text-base  text-[#ffffff] dark:text-gray-200'>
                      {movie.studio}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetails
