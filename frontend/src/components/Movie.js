import { useEffect, useMemo, useState } from 'react'
import {
  FaCheckCircle,
  FaHeart,
  FaPlay,
  FaPlus,
  FaRegArrowAltCircleDown,
  FaRegHeart,
  FaRegSmileBeam,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import ModalDetails from './ModalDetails'

const Movie = ({ item }) => {
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var accountId = getCookie('accountId')
    var token = getCookie('token')
  }

  const [like, setLike] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [movieOptions, setMovieOptions] = useState()
  const [movieOptionsStatus, setMovieOptionsStatus] = useState(true)

  const [icons, setIcons] = useState(false)
  const onMouseLeave = () => setIcons(false)

  const handleModal = movieId => {
    console.log(movieId)
    setTimeout(function () {
      setShowModal(!false)
    }, 400)
  }

  const showIcons = () => {
    setIcons(!false)
  }

  const addListMovie = async film_id => {
    let formData = new FormData()
    formData.append('film_id', film_id)
    formData.append('account_id', accountId)
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response)
        setMovieOptionsStatus(!true)

        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const checkAddedMovie = async film_id => {
    const account_id = accountId
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmId/${film_id}/accountId/${account_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(function (response) {
        setMovieOptions(response.data.message)
        setMovieOptionsStatus(response.data.status)
        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteListMovieId = async film_id => {
    console.log(film_id)
    const account_id = accountId
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmId/${film_id}/accountId/${account_id}/delete`,
    { headers: { Authorization: `Bearer ${token}` } },)
      .then(function (response) {
        console.log(response.data.message)
        setMovieOptionsStatus(!false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className='container'>
      <div className='card'>
        <div
          className='face faceOne'
          onMouseEnter={() => checkAddedMovie(item.film_id)}>
          {/* <div onClick={() => handleModaltwo(item.id)} className={`${style.content } sm:w-[100px] md:w-[200px] lg:w-[320px] lg:w-[320px] inline-block cursor-pointerp-[1px] `}> */}
          <div className='content'>
            <img
              className=''
              src={'http://localhost:8000/images/' + item?.backdrop_path}
              alt={item?.title}
            />
          </div>
        </div>
        <div className='face faceTwo'>
          <div className='content'>
            <div className='flex justify-between pl-5 pr-5 pt-7 pb-3 items-center '>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between'>
                  <FaPlay className='text-3xl cursor-pointer text-slate-300  ' />
                  <div>
                    <div className='flex justify-center flex-wrap'>
                      {!movieOptionsStatus !== true ? (
                        <FaPlus
                          className='ml-3 text-3xl cursor-pointer text-slate-300'
                          title={movieOptions}
                          onClick={() => addListMovie(item.film_id)}></FaPlus>
                      ) : (
                        <FaCheckCircle
                          className='ml-2 mr-2 text-2xl cursor-pointer text-slate-300'
                          title={movieOptions}
                          onClick={() => deleteListMovieId(item.film_id)}
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
                    <div className='relative'>
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
              <div className='flex justify-center flex-wrap'>
                <FaRegArrowAltCircleDown
                  onClick={() => handleModal(item.id)}
                  data-bs-toggle='tooltip'
                  data-bs-placement='top'
                  title='Episodios e información'
                  className=' ml-2 mr-2 text-2xl cursor-pointer text-slate-300'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal !== false && (
        <ModalDetails
          showModal={showModal}
          setShowModal={setShowModal}
          movie={item}
        />
      )}

      <style jsx>{`
        .container {
          position: relative;
          top: -45px;
          width: 300px;
          height: 261px;
        }
        .container .card {
          cursor: pointer;
        }

        .container .card:hover {
          z-index: 3;
          transition: 0.9s;
          width: 300px;
        }

        .container .card .face {
          width: 300px;
          transition: 0.9s;
        }

        .container .card .face.faceOne {
          position: relative;
          z-index: 1;
          transform: translateY(100px);
        }

        .container .card:hover .face.faceOne {
          transform: translateY(46px);
          transition: 1s;
        }

        .container .card .face.faceOne .content {
          transition: 1s;
        }

        .container .card .face.faceTwo {
          background: #141414;
          transform: translateY(-71px);
          transition: 1s;
        }

        .container .card:hover .face.faceTwo {
          transform: translateY(34px);
          transition: 1s;
        }
        .icons_add_movie {
          position: relative;
        }
        .add_text {
          position: absolute;
          top: -3px;
          left: -50px;
          background: white;
          width: 150px;
          height: 27px;
          z-index: 1;
          border-radius: 0.3rem;
          font-size: 1rem;
          font-weight: 700;
          color: #353535;
        }
      `}</style>
    </div>
  )
}

export default Movie

// 'image' => fake()->imageUrl($width=400, $height=400)
