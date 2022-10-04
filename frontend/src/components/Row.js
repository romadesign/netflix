import axios from 'axios'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useEffect, useRef, useState } from "react"
import Movie from './Movie';
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

const Row = ({ title, category_id, genre_id }) => {
    const { getCookie } = useAuth()
    const token = getCookie('token')
	const router = useRouter()

	const slider = useRef();
	const [movies, setMovies] = useState()
    console.log(movies)

	//pagination config
	const [pagination, setpagination] = useState('')
	const [current_page, setcurrent_page] = useState('')
	const [next_page_url, setnext_page_url] = useState('')
	const [first_page_url, setfirst_page_url] = useState('')
	const [prev_page_url, setprev_page_url] = useState('')
	const [totalPage, settotalPage] = useState('')

	useEffect(() => {
		getFilms()
	}, [])

	async function getFilms() {
		if (router.pathname === '/films') {
			console.log('estamos en films')
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmsgenre/${genre_id}`,
                {headers: { "Authorization": `Bearer ${token}` }}
			)
			const data = response.data.data
			setpagination(response.data.data)
			setcurrent_page(response.data.data.current_page)
			setnext_page_url(response.data.data.next_page_url)
			setfirst_page_url(response.data.data.first_page_url)
			setprev_page_url(response.data.data.prev_page_url)
			settotalPage(response.data.data.total)
			setMovies(data.data)
		} else if(router.pathname === '/series' || router.pathname === '/peliculas'){
			console.log('estamos en series')
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmscategory/${category_id}/filmsgenre/${genre_id}`,
                {headers: { "Authorization": `Bearer ${token}` }}
			)
			const data = response.data.data
			setpagination(response.data.data)
			setcurrent_page(response.data.data.current_page)
			setnext_page_url(response.data.data.next_page_url)
			setfirst_page_url(response.data.data.first_page_url)
			setprev_page_url(response.data.data.prev_page_url)
			settotalPage(response.data.data.total)
			setMovies(data.data)
		}
	}
	//Funtion pagination

	async function changeNextPage() {

	}

	// const sliderLeft = () => {
	// 	var slider = document.getElementById('slider' + categoryId)
	// 	slider.scrollLeft = slider.scrollLeft - 500;
	// }

	// const sliderRigth = () => {
	// 	var slider = document.getElementById('slider' + categoryId)
	// 	slider.scrollLeft = slider.scrollLeft + 500;
	// }

	async function sliderLeft() {
		const response = await axios.get(`${prev_page_url}`,)
		const data = response.data
		setprev_page_url(data.data.prev_page_url)
		//nextPage
		setcurrent_page(data.data.current_page)
		setnext_page_url(data.data.next_page_url)
		//update data
		setMovies(data.data.data)
		setpagination(data.data)
		slider.current.scrollLeft = slider.current.scrollLeft - 1200;
	}

	async function sliderRigth() {
		if (next_page_url !== null) {
			const response = await axios.get(`${next_page_url}`)
			const data = response.data
			setprev_page_url(data.data.prev_page_url)
			//nextPage
			setcurrent_page(data.data.current_page)
			setnext_page_url(data.data.next_page_url)
			//update data
			setMovies((prevResults) => [...prevResults, ...data.data.data]);
			setpagination(data.data)
			slider.current.scrollLeft = slider.current.scrollLeft + 1200;
		}
	};


	return (
		<div className='relative'>
			<h2 className='absolute text-white font-bold md:text-xl pt-3 pl-6'>{title}</h2>
			<div className='relative flex items-center group'>
				{movies !== undefined ?
					(<>
						<MdChevronLeft
							onClick={sliderLeft}
							className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
							size={40}
						/>
						<div ref={slider} id={'slider'} // + categoryId
							className='w-full relative h-full overflow-x-scroll text-center flex scroll-smooth scrollbar-hide relative justify-center'>
							{movies.map((item, id) => (
								<Movie key={id} item={item} />
							))}
						</div>
						<MdChevronRight
							disabled={next_page_url == null}
							onClick={sliderRigth}
							className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
							size={40}
						/>
					</>) :
					(
						<div>Cargando datos</div>
					)
				}
			</div>
		</div>
	)
}

export default Row
