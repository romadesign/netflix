import { useEffect, useMemo, useState } from 'react'
import {
  FaCheckCircle,
  FaPlay,
  FaPlus,
  FaRegArrowAltCircleDown,
  FaRegSmileBeam,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'
import ModalDetails from './ModalDetails'
import { useRouter } from 'next/router'
import { Api } from '@/hooks/api'

const Movie = ({ item }) => {
  const router = useRouter()
  const { getCookie } = useAuth()
  const {
    apiPostAddFilmList,
    apiGetSearchFilmsByAccount,
    apiPostDeleteFilmList,
    apiGetImage,
  } = Api()

  if (typeof window !== 'undefined') {
    var accountId = getCookie('accountId')
    var token = getCookie('token')
  }

  const [showModal, setShowModal] = useState(false)
  const [movieOptions, setMovieOptions] = useState()
  const [movieOptionsStatus, setMovieOptionsStatus] = useState(true)

  //content data movie
  const [dataStatus, setDataStatus] = useState(false)

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

  const addListMovie = film_id => {
    let formData = new FormData()
    formData.append('film_id', film_id)
    formData.append('account_id', accountId)

    apiPostAddFilmList(formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(function (res) {
        console.log(res)
        setMovieOptionsStatus(!true)
        //update checked movie my list
        checkAddedMovie(film_id)
        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const checkAddedMovie = async film_id => {
    const account_id = accountId
    //show data movie
    setDataStatus(!false)
    //get Api
    apiGetSearchFilmsByAccount(film_id, account_id)
      .then(function (res) {
        setMovieOptions(res.data.message)
        setMovieOptionsStatus(res.data.status)
        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteListMovieId = async film_id => {
    const account_id = accountId

    apiPostDeleteFilmList(film_id, account_id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(function (res) {
        console.log(res.data.message)
        setMovieOptionsStatus(!false)
        router.reload()
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
          <div className='content'>
            <img
              className='p-1 rounded-lg'
              src={apiGetImage(item?.backdrop_path)}
              alt={item?.title}
            />
          </div>
        </div>
        {dataStatus !== false && (
          <div className='face faceTwo'>
            <div className='content'>
              <div className='flex justify-between pl-5 pr-5 pt-5  items-center '>
                <div className='flex justify-between items-center'>
                  <div className='flex justify-between'>
                    <FaPlay className='text-3xl cursor-pointer text-slate-300' />
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
        )}
      </div>

      {showModal !== false && (
        <ModalDetails
          movie={item}
          setShowModal={setShowModal}
          //fucntion click add and delete movie
          addListMovie={addListMovie}
          deleteListMovieId={deleteListMovieId}
          //status icons add and remove movie
          movieOptionsStatus={movieOptionsStatus}
          //capture message getCheckadd movie status
          movieOptions={movieOptions}
        />
      )}

      <style jsx>{`
        .container {
          position: relative;
          top: -45px;
          width: 300px;
          height: 280px;
        }
        .container .card {
          cursor: pointer;
        }

        .container .card:hover {
          z-index: 3;
          transition: 0.9s;
          width: 300px;
          height: 0;
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
          transition: 2s;
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
          transition: 2s;
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
