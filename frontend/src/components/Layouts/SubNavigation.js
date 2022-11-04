import axios from 'axios'
import styles from '../../../styles/navbar.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SubNavigation = ({ title }) => {
  const router = useRouter()
  const query = router.query
  const genreGetUrl = query.type

  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var name = getCookie('name')
  }
  const [genres, setGenres] = useState()
  const [selectOptions, setSelectOptions] = useState(false)
  const [selectOptionData, setSelectOptionData] = useState({ genreGetUrl: '' })
  console.log(genreGetUrl)

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    getGenres()
  }, [])

  async function getGenres () {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`,
    )
    const data = response.data.data
    setGenres(data)
  }

  const handleChange = e => {
    setSelectOptions(true)
    if (selectOptions == !true) {
      setSelectOptions(!false)
    } else {
      setSelectOptions(!true)
    }
  }

  const onMouseLeave = () => {
    setSelectOptions(false)
  }

  return (
    <>
      <div
        className={`${
          router.pathname === '/films'
            ? styles.subnavbar
            : styles.subnavbarFilms
        }`}>
        {router.pathname === '/films' ? (
          <span className={styles.subnavbar_text_filmsUrl}>
            Recomendaciones diarias para {name}
          </span>
        ) : (
          <div
            className={`${
              !isScrolled ? styles.subnavbar_text : styles.subnavbarContentGenre
            }`}>
            {title}
            <div className={styles.content_navbar}>
              <div className={styles.select_options} onClick={handleChange}>
                {selectOptionData.genreGetUrl == '' ? (
                  <>
                    {genreGetUrl == undefined ? (
                      <>Seleccionar</>
                    ) : (
                      <>{genreGetUrl}</>
                    )}
                  </>
                ) : (
                  <>{selectOptionData.genre}</>
                )}
              </div>
              {selectOptions ? (
                <div
                  className={`${
                    !isScrolled
                      ? styles.content_sub_navbar
                      : styles.content_navbarOther
                  }`}
                  onMouseLeave={onMouseLeave}>
                  {router.pathname === '/series' ||
                  router.pathname === '/series/genre/[id]' ? (
                    <>
                      {genres !== undefined &&
                        genres.map(genre => (
                          <div
                            className={styles.urlId}
                            onClick={() =>
                              setSelectOptionData({
                                genre: genre.title,
                              })
                            }>
                            <Link
                              href={{
                                pathname: `/series/genre/${genre.id}`,
                                query: { type: genre.title }, // the data genre,
                              }}>
                              {genre.title}
                            </Link>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {genres !== undefined &&
                        genres.map(genre => (
                          <div
                            className={styles.urlId}
                            onClick={() =>
                              setSelectOptionData({
                                genre: genre.title,
                              })
                            }>
                            <Link
                              href={{
                                pathname: `/peliculas/genre/${genre.id}`,
                                query: { type: genre.title }, // the data genre,
                              }}>
                              {genre.title}
                            </Link>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SubNavigation
