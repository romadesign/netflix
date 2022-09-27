import { useRouter } from 'next/router'
import { useEffect, useState, useSyncExternalStore } from 'react'
import axios from 'axios'
import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import Label from '@/components/Label'
import Input from '@/components/Input'
import DynamicDataUpdate from '@/components/BackOfficeProvider/DynamicDataUpdate'
import DynamicImage from '@/components/BackOfficeProvider/DynamicImage'
import { useAuth } from '@/hooks/auth'
import Image from '@/components/Image'

const FilmDetail = ({ films }) => {
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var userIdCookie = getCookie('id')
    var userTypeCookie = getCookie('type')
  }

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
  const [dataProtagonists, setDataProtagonists] = useState(film.protagonists,) //Update Protagonists
  const [dataGnre, setDataGnres] = useState(film.genre) //Update Protagonists backdrop_path
  console.log(dataGnre, 'userIdCookiesssss log')

  const [dataBackdrop_path, setDataBackdrop_path] = useState(film.backdrop_path) //Update poster_path
  const [dataPoster_path, setDataPoster_path] = useState(film.poster_path) //Update poster_path

  const arr = [
    { value: 0, text: 'Public' },
    { value: 1, text: 'Private' },
  ]

  useEffect(() => {
    getCategories()
  }, [])

  //get categories
  async function getCategories() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    )
    const data = response.data.data
    return setGetCategories(data)
  }

  const updateFilm = async e => {
    e.preventDefault()
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

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film/${id}/edit`,
        formData,
      )
      .then(function (response) {
        console.log(response, 'llega')
        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <AppLayout>
      <Head>
        <title>Film update</title>
      </Head>
      <div className="py-12">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              type="text"
              placeholder="title"
              value={updateTitle}
              onChange={event => setUpdateTitle(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              type="description"
              value={updateDescription}
              onChange={event => setUpdateDescription(event.target.value)}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
          </div>
          {/* tree content */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="categorie">Categorie</Label>
              <div className="relative">
                <select
                  type="select"
                  value={updateCategorie}
                  onChange={event => setUpdateCategorie(event.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="categorie_id">
                  {getcategories.map(categorie => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="status">Status</Label>
              <div className="relative">
                <select
                  value={updateStatus}
                  onChange={event => setUpdateStatus(event.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {arr.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                type="text"
                placeholder="duration"
                value={updateDuration}
                onChange={event => setUpdateDuration(event.target.value)}
              />
            </div>
          </div>

          {/* two content */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="studio">Studio</Label>
              <Input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="studio"
                id="studio"
                value={updateStudio}
                onChange={event => setUpdateStudio(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="country">Country</Label>
              <Input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="country"
                type="text"
                placeholder="country"
                value={updateCountry}
                onChange={event => setUpdateCountry(event.target.value)}
              />
            </div>
          </div>

          {/* two content */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                type="text"
                placeholder="director"
                value={updateDirector}
                onChange={event => setUpdateDirector(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="producer">Producer</Label>
              <Input
                id="producer"
                type="text"
                placeholder="producer"
                value={updateProducer}
                onChange={event => setUpdateProducer(event.target.value)}
              />
            </div>
          </div>

          {/* Three content */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="premiere">Premiere</Label>
              <Input
                id="premiere"
                type="text"
                placeholder="premiere"
                value={updatePremiere}
                onChange={event => setUpdatePremiere(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                placeholder="rating"
                value={updateRating}
                onChange={event => setUpdateRating(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="award">Award</Label>
              <Input
                id="award"
                type="text"
                placeholder="award"
                value={updateAward}
                onChange={event => setUpdateAward(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <DynamicDataUpdate
                title={'Protagonist List'}
                dataDinamicUpdate={dataProtagonists}
                setDataDinamic={setDataProtagonists}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <DynamicDataUpdate
                title={'Genre List'}
                dataDinamicUpdate={dataGnre}
                setDataDinamic={setDataGnres}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <Image
                datafiles={dataBackdrop_path}
                setFile={setDataBackdrop_path}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <DynamicImage
                datafiles={dataPoster_path}
                setFile={setDataPoster_path}
              />
            </div>
          </div>
          <button onClick={updateFilm}>post</button>
        </form>
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
