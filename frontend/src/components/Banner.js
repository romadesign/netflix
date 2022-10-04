import axios from 'axios'
import styles from '../../styles/banner.module.css'
import { useEffect, useState } from "react"
import { useAuth } from '@/hooks/auth'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import ModalDetails from '@/components/ModalDetails'
import { useRouter } from 'next/router'


const Banner = () => {
    const router = useRouter()
    const { getCookie } = useAuth()
    if (typeof window !== 'undefined') {
        var name = getCookie('name')
    }
    const [movieramdon, setMovieRamdon] = useState();
    const [genres, setGenres] = useState();
    console.log(genres)

    console.log(movieramdon)
    const [showModal, setShowModal] = useState(false)
    const onMouseEnter = () => setShowModal(true);
    const onMouseLeave = () => { setTimeout(function () { setShowModal(false) }, 400) }

    useEffect(() => {
        getMovie()
        getGenres()
    }, [])

    async function getMovie() {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movieramdon`,
        )
        const data = response.data
        setMovieRamdon(data)
    }

    async function getGenres() {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`,
        )
        const data = response.data.data
        setGenres(data)
    }


    const handleModal = (movieId) => {
        setTimeout(function () {
            setShowModal(!false)
        }, 400);
    }

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <div className={styles.banner} >
            {router.pathname === '/films' ?
                <span className={styles.banner_text} >Recomendaciones diarias para {name}</span> :
                <div>{router.pathname === '/series' ?
                    <div  >
                        <div className={styles.banner_text}>
                            Series TV
                            <div className={styles.content_navbar}>
                                <div className="">
                                    <div className="">
                                        <select className="text-sm text-white bg-[#ffffff45] pl-2 pr-2">
                                            <option className='text-white  text-sm bg-[black]' selected>Géneros</option>
                                            {genres !== undefined &&
                                                genres.map((genre) => (
                                                    <option className='text-white  text-sm bg-[black]' value={genre.id}>{genre.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <div className={styles.banner_text}>
                            Películas
                            <div className={styles.content_navbar}>
                                <div className="">
                                    <div className="">
                                        <select className="text-sm text-white bg-[#ffffff45] pl-2 pr-2">
                                            <option className='text-white  text-sm bg-[black]' selected>Géneros</option>
                                            {genres !== undefined &&
                                                genres.map((genre) => (
                                                    <option className='text-white  text-sm bg-[black]' value={genre.id}>{genre.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                </div>
            }
            <div className={styles.content}>
                {movieramdon !== undefined &&
                    <img className={styles.banner_image} src={"http://localhost:8000/images/" + movieramdon.backdrop_path} alt={movieramdon.title} />
                }
                <div className={styles.pqdka}></div>
            </div>
            {
                movieramdon !== undefined &&
                <div key={movieramdon.id}>
                    <h3 className={styles.banner_h3}>{movieramdon.title}</h3>
                    <p className={styles.banner_p}>{truncate(movieramdon.description, 150)}</p>
                    <div className={styles.contentButtons}>
                        <button className={styles.bannerButtonPlay}><FaPlay className={styles.buttonPlay} /> Play</button>
                        <button type="button" data-modal-toggle="defaultModal"

                            onMouseEnter={() => {
                                onMouseEnter
                                handleModal(movieramdon.id)
                            }}

                            className={`${styles.bannerButtonInfo}`}>
                            <FaInfoCircle className={styles.buttonPlay} />Más información
                        </button>
                    </div>
                </div>
            }
            {
                showModal !== false &&
                <ModalDetails showModal={showModal} setShowModal={setShowModal} movie={movieramdon} onMouse={onMouseLeave} />
            }
        </div >
    )
}

export default Banner
