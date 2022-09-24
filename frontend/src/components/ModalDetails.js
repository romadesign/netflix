import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaRegArrowAltCircleDown, FaRegSmileBeam, FaRegThumbsDown, FaRegThumbsUp, FaStar } from "react-icons/fa"

const ModalDetails = ({ movie, showModal, setShowModal, onMouse }) => {

	const [movieGenre, setMovieGenre] = useState(JSON.parse(movie.genre).toString().split('"')) 
	const [movieDeleteIndex, setMovieDeleteIndex] = useState(movieGenre.splice(1, movieGenre.length - 2))

	const [icons, setIcons] = useState(false)
	const onMouseLeave = () => setIcons(false);

	const closeModal = () => {
		setShowModal(!true)
	}

	const showIcons = () => {
		setIcons(!false)
	}

	
	return (
		<div className=" relative  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0  md:h-full w-[300px] grid items-center rounded-lg m-auto ">
			<div className="relative   max-w-md h-[100vh]  m-auto grid items-center ">
				<div onMouseLeave={onMouse} className="relative bg-white rounded-lg shadow dark:bg-[#141414] shadow-lg shadow-gray-500/300 ">
					<div className="">
						<button
							onClick={() => { closeModal() }}
							type="button" className="absolute z-10 top-3 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
							<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="pb-3 text-center  ">
							{/* <video className="w-full max-w-md h-full md:h-auto m-auto items-center" src="https://www.w3schools.com/html/mov_bbb.mp4" poster="presentacion.jpg" controls></video> */}
							<div id="responsiveVideoWrapper "  >
								<iframe
									className="w-full max-w-md rounded-lg"
									src="https://www.youtube.com/embed/Bh8O9F-5pUg"
									title="YouTube video player" 
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								>
								</iframe>
							</div>
							<div className="flex justify-between m-4 items-center mt-6">
								<div className="flex justify-between items-center">
									<div className="flex justify-between">
										<FaPlay className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300  " />
										<FaPlus className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
									</div>
									<div className="flex justify-between"
										onMouseEnter={showIcons}
										onMouseLeave={onMouseLeave}
										>
										{
											!icons ?
												(<div>
													<FaRegThumbsUp className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300 " />
												</div>) :
												(<div className="flex justify-between bg-[#090909] h-8 rounded-[15px] left-[-40px] h-[38px] relative items-center">
													<FaRegThumbsDown className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
													<FaRegThumbsUp className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300 " />
													<FaRegSmileBeam className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
												</div>)
										}
									</div>
								</div>
								<div>
									<FaRegArrowAltCircleDown className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
								</div>
							</div>
							
							<div className="flex items-center mb-5  m-4 items-center">
								{[...Array(movie.rating || 5)].map((star) => {
									return <FaStar color="#ffc107" />
								})}
							</div>
							<h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
								{movieDeleteIndex}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default ModalDetails
