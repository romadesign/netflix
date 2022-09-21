import axios from '@/lib/axios'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useEffect, useRef, useState } from "react"
import Movie from './Movie';

const Row = ({ title, categoryId }) => {
	const slider = useRef();
	const [movies, setMovies] = useState()
	console.log('movies', movies)

	useEffect(() => {
		const getFilms = async () => {
			const data = await axios.get(`/api/filmscategory/${categoryId}`)
			setMovies(data.data.data.data)
		}
		getFilms()
	}, [])

	// const sliderLeft = () => {
	// 	var slider = document.getElementById('slider' + categoryId)
	// 	slider.scrollLeft = slider.scrollLeft - 500;
	// }

	// const sliderRigth = () => {
	// 	var slider = document.getElementById('slider' + categoryId)
	// 	slider.scrollLeft = slider.scrollLeft + 500;
	// }

	const sliderLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

	const sliderRigth = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };




	return (
		<>
			<h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
			<div className='relative flex items-center group'>
				{movies !== undefined ?
					(
						<>
							<MdChevronLeft
								onClick={sliderLeft}
								className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
								size={40}
							/>
							<div  ref={slider}  id={'slider'} // + categoryId 
							 className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
							
							 >
								{movies.map((item, id) => (
									<Movie key={id} item={item} />
								))}
							</div>
							<MdChevronRight
								onClick={sliderRigth}
								className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
								size={40}
							/>
						</>
					) :
					(
						<div>Cargando datos</div>
					)
				}
			</div>
		</>
	)
}

export default Row
