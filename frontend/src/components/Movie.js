import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Movie = ({item}) => {
	const [like, setLike] = useState(false)

	return (
		<>
			<div className='w-[160px] sm:w-[200px] md:w-[200px] lg:w-[250px] inline-block cursor-pointer relative p-2'>
				<img className='w-full h-auto block' src={item?.poster_path} alt={item?.title} />
				<div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
					<p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
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
		</>
	)
}

export default Movie
