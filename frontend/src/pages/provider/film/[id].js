import { useRouter } from 'next/router'
import { useEffect, useState, useSyncExternalStore } from 'react'
import axios from 'axios'
import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import Head from 'next/head'
import Label from '@/components/Label'
import Input from '@/components/Input'
import DynamicDataUpdate from '@/components/BackOfficeProvider/DynamicDataUpdate'

const FilmDetail = ({ films }) => { //data traida de getServerSideProps
    const [film, setFilm] = useState(films.data)
    console.log(film)

    const [getcategories, setGetCategories] = useState([]) //GetCategories
    const [updateCategorie, setUpdateCategorie] = useState(film.categorie_id) //Update Data Categorie selected
    const [updateStatus, setUpdateStatus] = useState(film.movieStatus) //Update Data Categorie selected
    const [dataProtagonists, setDataProtagonists] = useState(JSON.parse(film.protagonists)) //Update Protagonists
    const [dataGnre, setDataGnres] = useState(JSON.parse(film.genre)) //Update Protagonists

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

  const submitForm = () => {}

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
              value={film.title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              type="description"
              value={film.description}
              onChange={event => setDescription(event.target.value)}
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
                value={film.duration}
                onChange={event => setDuration(event.target.value)}
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
                value={film.studio}
                onChange={event => setStudio(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="country">Country</Label>
              <Input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="country"
                type="text"
                placeholder="country"
                value={film.country}
                onChange={event => setCountry(event.target.value)}
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
                value={film.director}
                onChange={event => setDirector(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Label htmlFor="producer">Producer</Label>
              <Input
                id="producer"
                type="text"
                placeholder="producer"
                value={film.producer}
                onChange={event => setProducer(event.target.value)}
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
                value={film.premiere}
                onChange={event => setPremiere(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                placeholder="rating"
                value={film.rating}
                onChange={event => setRating(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <Label htmlFor="award">Award</Label>
              <Input
                id="award"
                type="text"
                placeholder="award"
                value={film.award}
                onChange={event => setAward(event.target.value)}
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
              {/* <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                  <DynamicImage
                    datafiles={backdrop_path}
                    setFile={setbackdrop_path}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                  <DynamicImage
                    datafiles={poster_path}
                    setFile={setposter_path}
                  />
                </div>
              </div> */}
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
