import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import DynamicData from '@/components/BackOfficeProvider/DynamicData'
import { useEffect, useState } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import DynamicImage from '@/components/BackOfficeProvider/DynamicImage'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Image from '@/components/Image'
import { countries } from '@/components/countrieList'
import DynamicGenres from '@/components/BackOfficeProvider/DynamicGenres'
import Alert from '@/components/BackOfficeProvider/Alert'
import { Api } from '@/hooks/api'

const Create = () => {
  const router = useRouter()

  const {  getCookie } = useAuth()
  const { apiPostFilm, apiGetCategories } = Api()

  if (typeof window !== 'undefined') {
    var userIdCookie = getCookie('id')
    var userTypeCookie = getCookie('type')
    var token = getCookie('token')
  }
  const [ListGenres, setListGenres] = useState()
  const [newgenreList, setNewGenre] = useState() //List new genre
  const [statusInfo, setStatusInfo] = useState(false)

  const [getcategories, setGetCategories] = useState([]) //GetCategories
  const [userId, setUserId] = useState(userIdCookie) //userId Login save, cookie get data
  const [userType, setUserType] = useState(userTypeCookie) //userId Login save, cookie get data

  const [statusModal, setStatusModal] = useState(false) //status component alert

  const arr = [
    { value: 0, text: 'Public' },
    { value: 1, text: 'Private' },
  ]

  //data register new films
  const [backdrop_path, setbackdrop_path] = useState('')
  const [poster_path, setposter_path] = useState('')
  const [message, setMessage] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categorie, setCategorie] = useState(1)
  const [status, setStatus] = useState(0)
  const [duration, setDuration] = useState('')
  const [studio, setStudio] = useState('')
  const [country, setCountry] = useState('')
  const [director, setDirector] = useState('')
  const [producer, setProducer] = useState('')
  const [premiere, setPremiere] = useState('')
  const [rating, setRating] = useState('')
  const [award, setAward] = useState('')
  const [protagonistsList, setProtagonists] = useState(['']) //Dynamic json data
  const [genreList, setGenre] = useState(['']) //Dynamic json data
  const [isCheckSelectedGenre, setIsCheckSelectedGenre] = useState([])
  console.log(isCheckSelectedGenre.length)

  useEffect(() => {
    getCategories()
  }, [])

  //get categories
  function getCategories () {
    apiGetCategories()
      .then(res => {
        const data = res.data.data
        setGetCategories(data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  //Post Film

  const inputsValidation =
    title === '' ||
    description === '' ||
    categorie === '' ||
    status === '' ||
    duration === '' ||
    studio === '' ||
    country === '' ||
    director === '' ||
    producer === '' ||
    premiere === '' ||
    rating === '' ||
    award === '' ||
    protagonistsList[0] === '' ||
    genreList[0] === '' ||
    backdrop_path === '' ||
    poster_path === '' ||
    isCheckSelectedGenre.length < 1

  const postData = e => {
    e.preventDefault()
    if (inputsValidation) {
      setStatusModal(!false)
    } else {
      let formData = new FormData()
      formData.append('userId', userId)
      formData.append('userType', userType)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('backdrop_path', backdrop_path)
      formData.append('poster_path', poster_path)
      formData.append('categorie_id', categorie)
      formData.append('movieStatus', status)
      formData.append('duration', duration)
      formData.append('studio', studio)
      formData.append('country', country)
      formData.append('director', director)
      formData.append('producer', producer)
      formData.append('premiere', premiere)
      formData.append('rating', rating)
      formData.append('award', award)
      formData.append('protagonists', JSON.stringify(protagonistsList))
      formData.append('genre', JSON.stringify(genreList))
      // formData.append('genre_id', isCheckSelectedGenre)
      formData.append('genre_id', JSON.stringify(isCheckSelectedGenre))
      apiPostFilm(formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          console.log(res, 'entro')
          router.push(`/provider`)
        })
        .catch(error => {
          console.log(error, 'entro') // "oh, no!"
        })
    }
  }

  return (
    <AppLayout>
      <Head>
        <title>Create Film</title>
      </Head>
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              Crea una nueva pelicula con todos los datos, se recomienda llenar
              todos los datos
            </div>
          </div>
          <div className='w-full py-8'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className='flex gap-4 justify-items-center items-center'>
                <div className='mb-4 w-full'>
                  <Label htmlFor='title'>title</Label>
                  <Input
                    id='title'
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                  />
                </div>
                <button
                  onClick={postData}
                  type='button'
                  class='inline-block h-[46px] px-9 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'>
                  Crear
                </button>
              </div>
              <div className='mb-4'>
                <Label htmlFor='description'>Description</Label>
                <textarea
                  id='description'
                  type='description'
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                  Ingresa una descripción de la pelicula
                </textarea>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='categorie'>Categorie</Label>
                  <div className='relative'>
                    <select
                      type='select'
                      value={categorie}
                      onChange={event => setCategorie(event.target.value)}
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='categorie_id'>
                      {getcategories.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='status'>Status</Label>
                  <div className='relative'>
                    <select
                      value={status}
                      onChange={event => setStatus(event.target.value)}
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                      {arr.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='duration'>Duration</Label>
                  <Input
                    id='duration'
                    type='text'
                    placeholder='duration'
                    value={duration}
                    onChange={event => setDuration(event.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-2 items-center'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='studio'>Studio</Label>
                  <Input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='text'
                    placeholder='studio'
                    id='studio'
                    value={studio}
                    onChange={event => setStudio(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3  md:mb-0"'>
                  <Label htmlFor='studio'>Country</Label>
                  <select
                    onChange={e => setCountry(e.target.value)}
                    id='countries'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option selected>Selecciona una país</option>
                    {countries.map(country => (
                      <option value={country?.name}>{country?.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='director'>Director</Label>
                  <Input
                    id='director'
                    type='text'
                    placeholder='director'
                    value={director}
                    onChange={event => setDirector(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='producer'>Producer</Label>
                  <Input
                    id='producer'
                    type='text'
                    placeholder='producer'
                    value={producer}
                    onChange={event => setProducer(event.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='premiere'>Premiere</Label>
                  <Input
                    id='premiere'
                    type='text'
                    placeholder='premiere'
                    value={premiere}
                    onChange={event => setPremiere(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='rating'>Rating</Label>
                  <Input
                    id='rating'
                    type='number'
                    placeholder='rating'
                    value={rating}
                    min='1'
                    max='5'
                    onChange={event => setRating(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='award'>Award</Label>
                  <Input
                    id='award'
                    type='text'
                    placeholder='award'
                    value={award}
                    onChange={event => setAward(event.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <DynamicData
                    title={'Protagonist List'}
                    dataDinamic={protagonistsList}
                    setDataDinamic={setProtagonists}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <DynamicData
                    title={'Genre List'}
                    dataDinamic={genreList}
                    setDataDinamic={setGenre}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <Image datafiles={backdrop_path} setFile={setbackdrop_path} />
                </div>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <DynamicImage
                    datafiles={poster_path}
                    setFile={setposter_path}
                  />
                </div>
              </div>

              <DynamicGenres
                title={'Genres Object List'}
                isCheck={isCheckSelectedGenre}
                setIsCheck={setIsCheckSelectedGenre}
                ListGenres={ListGenres}
                setListGenres={setListGenres}
                listDetailFilmGenreShow={newgenreList}
                setNewGenre={setNewGenre}
                statusInfo={statusInfo}
                setStatusInfo={setStatusInfo}
              />
            </form>
          </div>
        </div>
        <Alert
          statusModal={statusModal}
          setStatusModal={setStatusModal}
          title={title}
          description={description}
          categorie={categorie}
          status={status}
          duration={duration}
          studio={studio}
          country={country}
          director={director}
          producer={producer}
          premiere={premiere}
          rating={rating}
          award={award}
          protagonistsList={protagonistsList}
          genreList={genreList}
          backdrop_path={backdrop_path}
          poster_path={poster_path}
          isCheckSelectedGenre={isCheckSelectedGenre}
        />
      </div>
    </AppLayout>
  )
}

export default Create
