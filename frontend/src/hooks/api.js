import axios from '@/lib/axios'

export const Api = () => {
  //////////FILMS PROVIDER
  //get Films
  const apiGetFilms = async () => {
    const data = await axios.get('/api/films')
    return data
  }

  //get film id
  const apiGetFilmId = async id => {
    const data = await axios.get(`/api/film/${id}`)
    return data
  }

  //get genres
  const apiGetGenres = async () => {
    const data = await axios.get('/api/genres')
    return data
  }

  //post create Film
  const apiPostFilm = async formData => {
    const data = await axios.post(`/api/film`, formData)
    return data
  }

  //post edit Film
  const apiEditFilm = async (id, formData) => {
    const data = await axios.post(`/api/film/${id}/edit`, formData)
    return data
  }

   //post delete Film
   const apiDeleteFilm = async (id) => {
    const data = await axios.post(`/api/film/${id}/delete`)
    return data
  }

  //post delete all Films
  const apiDeleteFilmsAll = async (ids) => {
    const data = await axios.post(`/api/film/${ids}/deleteall`)
    return data
  }

  return {
    apiGetFilms,
    apiGetGenres,
    apiGetFilmId,
    apiPostFilm,
    apiEditFilm,
    apiDeleteFilm,
    apiDeleteFilmsAll,
  }
}
