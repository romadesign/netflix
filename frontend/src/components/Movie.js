import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ModalDetails from './ModalDetails';

const Movie = ({item}) => {

	const [like, setLike] = useState(false)
	const [showModal, setShowModal] = useState(false)



	const handleModal = (movieId) => {
		console.log(movieId)
		setTimeout(function () {
			setShowModal(!false)
		}, 400);
	}

	return (
		<div>
			<div onClick={() => handleModal(item.id)} className='w-[160px] sm:w-[100px] md:w-[200px] lg:w-[320px] lg:w-[320px] inline-block cursor-pointer relative p-[1px] '>
				<img className='w-full h-auto block' src={"http://localhost:8000/images/" + item?.backdrop_path} alt={item?.title} />	
				

				<div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white '>
					<p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center '>
						{item?.title}
					</p>
					<p>
						{like ? (
							<FaHeart className='absolute top-4 left-4 text-gray-300' />
						) : (
							<FaRegHeart className='absolute top-4 left-4 text-gray-300' />
						)}
					</p>
				</div>
			</div>
			{showModal !== false &&
				<ModalDetails  showModal={showModal} setShowModal={setShowModal} movie={item}  />
			}
		</div>
	)
}

export default Movie

// 'image' => fake()->imageUrl($width=400, $height=400)