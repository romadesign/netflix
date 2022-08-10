import AppLayout from '@/components/BackOfficeProvider/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import DynamicData from '@/components/BackOfficeProvider/DynamicData'
import { useEffect, useState } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import DynamicImage from '@/components/BackOfficeProvider/DynamicImage'

const Create = () => {
  const [getcategories, setGetCategories] = useState([]) //GetCategories

  const arr = [
    { value: 0, text: 'Public' },
    { value: 1, text: 'Private' },
  ]

  //   const [files, setFile] = useState([])
  const [backdrop_path, setbackdrop_path] = useState('')
  const [poster_path, setposter_path] = useState('')
  const [message, setMessage] = useState()
  //data register new films
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categorie, setCategorie] = useState('')
  const [status, setStatus] = useState(0)
  const [duration, setDuration] = useState('')
  const [studio, setStudio] = useState('')
  const [country, setCountry] = useState('')
  const [director, setDirector] = useState('')
  const [producer, setProducer] = useState('')
  const [premiere, setPremiere] = useState('')
  const [rating, setRating] = useState('')
  const [award, setAward] = useState('')
  const [protagonistsList, setProtagonists] = useState([{ name: '' }]) //Dynamic json data
  const [genreList, setGenre] = useState([{ name: '' }]) //Dynamic json data

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

  // const [selectedImage, setSelectedImage] = useState()

  // // This function will be triggered when the file field change
  // const imageChange = e => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedImage(e.target.files[0])
  //   }
  // }

  // // This function will be triggered when the "Remove This Image" button is clicked
  // const removeSelectedImage = () => {
  //   setSelectedImage()
  // }

  const [base64code, setbase64code] = useState('')

  console.log(base64code)

  const send = e => {
    const files = e.target.files
    const file = files[0]
    getBase64(file)
  }

  const onLoad = fileString => {
    setbase64code(fileString)
  }

  const getBase64 = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      onLoad(reader.result)
    }
  }

  const postData = async e => {
    e.preventDefault()

    let formData = new FormData()

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
    formData.append('protagonists', protagonistsList)
    formData.append('genre', genreList)

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/film`, formData)
      .then({ data })
      .catch(({ response }) => {
        if (response.status === 422) {
        }
      })
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
              Crea una nueva pelicula con todos los datos, se recomienda llenar
              todos los datos
            </div>
          </div>
          <div className="w-full py-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <Label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title">
                  title
                </Label>
                <Input
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description">
                  Description
                </Label>
                <textarea
                  id="description"
                  type="description"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  Ingresa una descripción de la pelicula
                </textarea>
              </div>
              {/* tree content */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="categorie">
                    Categorie
                  </Label>
                  <div className="relative">
                    <select
                      type="select"
                      value={categorie}
                      onChange={event => setCategorie(event.target.value)}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="categorie_id">
                      {getcategories.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="status">
                    Status
                  </Label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={event => setStatus(event.target.value)}
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
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="duration">
                    Duration
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="duration"
                    type="text"
                    placeholder="duration"
                    value={duration}
                    onChange={event => setDuration(event.target.value)}
                  />
                </div>
              </div>

              {/* two content */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="studio">
                    Studio
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="studio"
                    id="studio"
                    value={studio}
                    onChange={event => setStudio(event.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="country">
                    Country
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="country"
                    type="text"
                    placeholder="country"
                    value={country}
                    onChange={event => setCountry(event.target.value)}
                  />
                </div>
              </div>

              {/* two content */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="director">
                    Director
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="director"
                    type="text"
                    placeholder="director"
                    value={director}
                    onChange={event => setDirector(event.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="producer">
                    Producer
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="producer"
                    type="text"
                    placeholder="producer"
                    value={producer}
                    onChange={event => setProducer(event.target.value)}
                  />
                </div>
              </div>

              {/* Three content */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="premiere">
                    Premiere
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="premiere"
                    type="text"
                    placeholder="premiere"
                    value={premiere}
                    onChange={event => setPremiere(event.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rating">
                    Rating
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="rating"
                    type="number"
                    placeholder="rating"
                    value={rating}
                    onChange={event => setRating(event.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="award">
                    Award
                  </Label>
                  <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="award"
                    type="text"
                    placeholder="award"
                    value={award}
                    onChange={event => setAward(event.target.value)}
                  />
                </div>
              </div>

              {/* format json */}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                  <DynamicData
                    title={'Protagonist List'}
                    dataDinamic={protagonistsList}
                    setDataDinamic={setProtagonists}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <DynamicData
                    title={'Genre List'}
                    dataDinamic={genreList}
                    setDataDinamic={setGenre}
                  />
                </div>
              </div>
              {/* image */}
              <DynamicImage
                datafiles={backdrop_path}
                setFile={setbackdrop_path}
              />

              <DynamicImage
                datafiles={poster_path}
                setFile={setposter_path}
              />

              {/* <input type="file" onChange={send} /> */}

              <button onClick={postData}>post</button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Create
