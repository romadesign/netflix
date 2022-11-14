import axios from 'axios'
import styles from '../../../styles/navbar.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Api } from '@/hooks/api'

const SubNavigation = ({ title }) => {
  const router = useRouter()
  const { getCookie } = useAuth()
  const { apiGetGenres } = Api()

  const query = router.query
  const genreGetUrl = query.type

  if (typeof window !== 'undefined') {
    var name = getCookie('name')
  }
  const [genres, setGenres] = useState()
  const [selectOptions, setSelectOptions] = useState(false)
  const [selectOptionData, setSelectOptionData] = useState({ genreGetUrl: '' })

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

  function getGenres () {
    apiGetGenres()
      .then(res => {
        const data = res.data.data
        setGenres(data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
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

  const urlSeries =
    router.pathname === '/series' || router.pathname === '/series/genre/[id]'
  const urlFilms =
    router.pathname === '/peliculas' ||
    router.pathname === '/peliculas/genre/[id]'

  return (
    <>
      <div
        className={`${
          router.pathname === '/films'
            ? styles.subnavbar
            : styles.subnavbarFilms
        }`}>
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
            {selectOptions && (
              <div
                className={`${
                  !isScrolled
                    ? styles.content_sub_navbar
                    : styles.content_navbarOther
                }`}
                onMouseLeave={onMouseLeave}>
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
                        {urlSeries && (
                          <Link
                            href={{
                              pathname: `/series/genre/${genre.id}`,
                              query: { type: genre.title }, // the data genre,
                            }}>
                            {genre.title}
                          </Link>
                        )}
                        {urlFilms && (
                          <Link
                            href={{
                              pathname: `/peliculas/genre/${genre.id}`,
                              query: { type: genre.title }, // the data genre,
                            }}>
                            {genre.title}
                          </Link>
                        )}
                      </div>
                    ))}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SubNavigation
