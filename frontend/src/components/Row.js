import axios from 'axios'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useEffect, useRef, useState } from "react"
import Movie from './Movie';

const Row = ({ title, categoryId }) => {
	const slider = useRef();
	const [movies, setMovies] = useState()

	//pagination config
	const [pagination, setpagination] = useState('')
	const [current_page, setcurrent_page] = useState('')
	const [next_page_url, setnext_page_url] = useState('')
	const [first_page_url, setfirst_page_url] = useState('')
	const [prev_page_url, setprev_page_url] = useState('')
	const [totalPage, settotalPage] = useState('')

	useEffect(() => {
		async function getFilms() {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmscategory/${categoryId}`,
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
		getFilms()
	}, [])


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
		const response = await axios.get(`${prev_page_url}`)
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
		<>
			<h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
			<div className='relative flex items-center group'>
				{movies !== undefined ?
					(<>
						<MdChevronLeft
							onClick={sliderLeft}
							className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
							size={40}
						/>
						<div ref={slider} id={'slider'} // + categoryId 
							className='w-full h-full overflow-x-scroll text-center flex scroll-smooth scrollbar-hide relative justify-center'>
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
		</>
	)
}

export default Row
