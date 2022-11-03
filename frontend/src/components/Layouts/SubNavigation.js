import axios from 'axios'
import styles from '../../../styles/navbar.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

const SubNavigation = ({ title }) => {
	const router = useRouter()
	const { getCookie } = useAuth()
	if (typeof window !== 'undefined') {
		var name = getCookie('name')
	}
	const [genres, setGenres] = useState()

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

	async function getGenres() {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`,
		)
		const data = response.data.data
		setGenres(data)
	}


	return (
		<>
			<div
				className={`${router.pathname === '/films'
					? styles.subnavbar
					: styles.subnavbarFilms
					}`}>
				{router.pathname === '/films' ? (
					<span className={styles.subnavbar_text_filmsUrl}>
						Recomendaciones diarias para {name}
					</span>
				) : (
					<div>
						<div
							className={`${!isScrolled
								? styles.subnavbar_text
								: styles.subnavbarContentGenre
								}`}>
							{title}
							<div className={styles.content_navbar}>
								<div className=''>
									<div className=''>
										<select className='text-sm text-white bg-[#2e2e2e87] pl-2 pr-2 border-[1px] w-[100px] border-inherit'>
											<option
												className='text-white  text-sm bg-[black]'
												selected>
												Géneros
											</option>
											{
												router.pathname === '/series' || router.pathname === '/series/genre/[id]' ? (
													<>
														{genres !== undefined &&
															genres.map(genre => (
																<option
																	onClick={e =>
																		router.push(
																			'/series/genre/[id]',
																			`/series/genre/${genre?.id}`,
																		)
																	}
																	className='text-white  text-sm bg-[black]'
																	value={genre.id}>
																	{genre.title}
																</option>
															))}
													</>
												) : (
													<>
														{genres !== undefined &&
															genres.map(genre => (
																<option
																	onClick={e =>
																		router.push(
																			'/peliculas/genre/[id]',
																			`/peliculas/genre/${genre?.id}`,
																		)
																	}
																	className='text-white  text-sm bg-[black]'
																	value={genre.id}>
																	{genre.title}
																</option>
															))}
													</>
												)
											}
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default SubNavigation
