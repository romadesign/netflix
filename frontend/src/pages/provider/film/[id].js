import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import Label from '@/components/Label'
import Input from '@/components/Input'
import DynamicDataUpdate from '@/components/BackOfficeProvider/DynamicDataUpdate'
import DynamicImage from '@/components/BackOfficeProvider/DynamicImage'
import { useAuth } from '@/hooks/auth'
import { Api } from '@/hooks/api'
import Image from '@/components/Image'
import DynamicGenres from '@/components/BackOfficeProvider/DynamicGenres'
import { countries } from '@/components/countrieList'
import Alert from '@/components/BackOfficeProvider/Alert'

const FilmDetail = ({ films }) => {
  const router = useRouter()
  const { getCookie } = useAuth()
  const { apiGetCategories, apiEditFilm, apiGetFilmId } = Api()

  if (typeof window !== 'undefined') {
    var userIdCookie = getCookie('id')
    var userTypeCookie = getCookie('type')
  }

  const [statusModal, setStatusModal] = useState(false) //status component alert

  const [userIdToken, setUserIdToken] = useState(userIdCookie) //userId Login save, cookie get data
  const [userTypeToken, setUserTypeToken] = useState(userTypeCookie) //userId Login save, cookie get data
  console.log(userTypeToken, 'userIdCookiesssss log')

  //data traida de getServerSideProps
  const [film, setFilm] = useState(films.data)
  const [getcategories, setGetCategories] = useState([]) //GetCategories

  //update film
  const [id, setId] = useState(film.id) //Update Data id
  const [updateTitle, setUpdateTitle] = useState(film.title) //Update Data title
  const [updateDescription, setUpdateDescription] = useState(film.description) //Update Data description
  const [updateCategorie, setUpdateCategorie] = useState(film.categorie_id) //Update Data Categorie selected
  const [updateStatus, setUpdateStatus] = useState(film.movieStatus) //Update Data Categorie selected
  const [updateDuration, setUpdateDuration] = useState(film.duration) //Update Data duration
  const [updateStudio, setUpdateStudio] = useState(film.studio) //Update Data studio
  const [updateCountry, setUpdateCountry] = useState(film.country) //Update Data country
  const [updateDirector, setUpdateDirector] = useState(film.director) //Update Data director
  const [updateProducer, setUpdateProducer] = useState(film.producer) //Update Data producer
  const [updatePremiere, setUpdatePremiere] = useState(film.premiere) //Update Data premiere
  const [updateRating, setUpdateRating] = useState(film.rating) //Update Data rating
  const [updateAward, setUpdateAward] = useState(film.award) //Update Data award
  const [dataProtagonists, setDataProtagonists] = useState(film.protagonists) //Update Protagonists
  const [dataGnre, setDataGnres] = useState(film.genre) //Update Protagonists backdrop_path

  const [dataBackdrop_path, setDataBackdrop_path] = useState(film.backdrop_path) //Update poster_path
  const [dataPoster_path, setDataPoster_path] = useState(film.poster_path) //Update poster_path

  const [isCheckSelectedGenre, setIsCheckSelectedGenre] = useState([])
  const [ListGenres, setListGenres] = useState()
  const [newgenreList, setNewGenre] = useState(film.genres) //List new genre
  const [statusInfo, setStatusInfo] = useState(true)

  const arr = [
    { value: 0, text: 'Public' },
    { value: 1, text: 'Private' },
  ]

  const inputsValidation =
    updateTitle === '' ||
    updateDescription === '' ||
    updateCategorie === '' ||
    updateStatus === '' ||
    updateDuration === '' ||
    updateStudio === '' ||
    updateCountry === '' ||
    updateDirector === '' ||
    updateProducer === '' ||
    updatePremiere === '' ||
    updateRating === '' ||
    updateAward === '' ||
    dataProtagonists[0] === '' ||
    dataGnre[0] === '' ||
    dataBackdrop_path === '' ||
    dataPoster_path === '' ||
    isCheckSelectedGenre.length < 1

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

  const updateFilm = e => {
    e.preventDefault()
    if (inputsValidation) {
      setStatusModal(!false)
    } else {
      let formData = new FormData()
      formData.append('userType', userTypeToken)
      formData.append('provider_id', userIdToken)
      formData.append('title', updateTitle)
      formData.append('description', updateDescription)
      formData.append('backdrop_path', dataBackdrop_path)
      formData.append('poster_path', dataPoster_path)
      formData.append('categorie_id', updateCategorie)
      formData.append('movieStatus', updateStatus)
      formData.append('duration', updateDuration)
      formData.append('studio', updateStudio)
      formData.append('country', updateCountry)
      formData.append('director', updateDirector)
      formData.append('producer', updateProducer)
      formData.append('premiere', updatePremiere)
      formData.append('rating', updateRating)
      formData.append('award', updateAward)
      formData.append('protagonists', JSON.stringify(dataProtagonists))
      formData.append('genre', JSON.stringify(dataGnre))
      formData.append('genre_id', JSON.stringify(isCheckSelectedGenre))

      apiEditFilm(id, formData)
        .then(function (response) {
          router.push(`/provider`)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  return (
    <AppLayout>
      <Head>
        <title>Film update</title>
      </Head>
      <div className='py-12 '>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              Editar pelicula, se recomienda llenar todos los datos
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
                    value={updateTitle}
                    onChange={event => setUpdateTitle(event.target.value)}
                  />
                </div>
                <button
                  onClick={updateFilm}
                  type='button'
                  class='inline-block h-[46px] px-9 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'>
                  Update
                </button>
              </div>

              <div className='mb-4'>
                <Label htmlFor='description'>Description</Label>
                <textarea
                  id='description'
                  type='description'
                  value={updateDescription}
                  onChange={event => setUpdateDescription(event.target.value)}
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'></textarea>
              </div>
              {/* tree content */}
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='categorie'>Categorie</Label>
                  <div className='relative'>
                    <select
                      type='select'
                      value={updateCategorie}
                      onChange={event => setUpdateCategorie(event.target.value)}
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='categorie_id'>
                      {getcategories.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='status'>Status</Label>
                  <div className='relative'>
                    <select
                      value={updateStatus}
                      onChange={event => setUpdateStatus(event.target.value)}
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
                    value={updateDuration}
                    onChange={event => setUpdateDuration(event.target.value)}
                  />
                </div>
              </div>

              {/* two content */}
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='studio'>Studio</Label>
                  <Input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='text'
                    placeholder='studio'
                    id='studio'
                    value={updateStudio}
                    onChange={event => setUpdateStudio(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='country'>Country</Label>
                  <select
                    onChange={e => setUpdateCountry(e.target.value)}
                    id='countries'
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                    <option selected disabled>
                      {updateCountry}
                    </option>
                    {countries.map(country => (
                      <option value={country?.name}>{country?.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* two content */}
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='director'>Director</Label>
                  <Input
                    id='director'
                    type='text'
                    placeholder='director'
                    value={updateDirector}
                    onChange={event => setUpdateDirector(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='producer'>Producer</Label>
                  <Input
                    id='producer'
                    type='text'
                    placeholder='producer'
                    value={updateProducer}
                    onChange={event => setUpdateProducer(event.target.value)}
                  />
                </div>
              </div>

              {/* Three content */}
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='premiere'>Premiere</Label>
                  <Input
                    id='premiere'
                    type='text'
                    placeholder='premiere'
                    value={updatePremiere}
                    onChange={event => setUpdatePremiere(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='rating'>Rating</Label>
                  <Input
                    id='rating'
                    type='number'
                    placeholder='rating'
                    value={updateRating}
                    min='1'
                    max='5'
                    onChange={event => setUpdateRating(event.target.value)}
                  />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Label htmlFor='award'>Award</Label>
                  <Input
                    id='award'
                    type='text'
                    placeholder='award'
                    value={updateAward}
                    onChange={event => setUpdateAward(event.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <DynamicDataUpdate
                    title={'Protagonist List'}
                    dataDinamicUpdate={dataProtagonists}
                    setDataDinamic={setDataProtagonists}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <DynamicDataUpdate
                    title={'Genre List'}
                    dataDinamicUpdate={dataGnre}
                    setDataDinamic={setDataGnres}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <Image
                    datafiles={dataBackdrop_path}
                    setFile={setDataBackdrop_path}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 md:mb-0'>
                  <DynamicImage
                    datafiles={dataPoster_path}
                    setFile={setDataPoster_path}
                  />
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
              </div>
            </form>
          </div>
        </div>
        <Alert
          statusModal={statusModal}
          setStatusModal={setStatusModal}
          title={updateTitle}
          description={updateDescription}
          categorie={updateCategorie}
          status={updateStatus}
          duration={updateDuration}
          studio={updateStudio}
          country={updateCountry}
          director={updateDirector}
          producer={updateProducer}
          premiere={updatePremiere}
          rating={updateRating}
          award={updateAward}
          protagonistsList={dataProtagonists}
          genreList={dataGnre}
          backdrop_path={dataBackdrop_path}
          poster_path={dataPoster_path}
          isCheckSelectedGenre={isCheckSelectedGenre}
        />
      </div>
    </AppLayout>
  )
}


export const getServerSideProps = async context => {
    const { data: films } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film/` + context.query.id,
    )
    return {
      props: {
        films,
      },
    }
  }

export default FilmDetail
