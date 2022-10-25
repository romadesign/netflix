import axios from '@/lib/axios'

export const Api = () => {
    //get articles0
  const apiArticles = async () => {
    const data = await axios.get('/api/articles')
    return data
  }

  return {
    apiArticles,
  }
}
