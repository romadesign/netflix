import { useEffect, useState } from 'react'

const Alert = ({
    statusModal,
    setStatusModal,
    title,
    description,
    categorie,
    status,
    duration,
    studio,
    country,
    director,
    producer,
    premiere,
    rating,
    award,
    protagonistsList,
    genreList,
    backdrop_path,
    poster_path,
    isCheckSelectedGenre }) => {

    const [titleMsgError, settitleMsgError] = useState("El campo 'title' esta vacío")
    const [descriptionMsgError, setdescriptionMsgError] = useState("El campo 'description' esta vacío")
    const [categorieMsgError, setcategorieMsgError] = useState("El campo 'categorie' esta vacío")
    const [statusMsgError, setstatusMsgError] = useState("El campo 'status' esta vacío")
    const [durationMsgError, setdurationMsgError] = useState("El campo 'duration' esta vacío")
    const [studioMsgError, setstudioMsgError] = useState("El campo 'Studio' esta vacío")
    const [countryMsgError, setcountryMsgError] = useState("El campo 'Country' esta vacío")
    const [directorMsgError, setdirectorMsgError] = useState("El campo 'director' esta vacío")
    const [producerMsgError, setproducerMsgError] = useState("El campo 'Producer' esta vacío")
    const [premiereMsgError, setpremiereMsgError] = useState("El campo 'Premiere' esta vacío")
    const [ratingMsgError, setratingMsgError] = useState("El campo 'Rrating' esta vacío")
    const [awardMsgError, setawardMsgError] = useState("El campo 'Award' esta vacío")
    const [protagonistsListMsgError, setProtagonistsListMsgError] = useState("El campo 'Protagonists List' esta vacío")
    const [genreListMsgError, setGenreListMsgError] = useState("El campo 'Genres Object List' esta vacío")
    const [backdrop_pathMsgError, setBackdrop_pathMsgError] = useState("El campo 'Backdrop_path' esta vacío")
    const [poster_pathMsgError, setPoster_pathMsgError] = useState("El campo 'Poster_path' esta vacío")
    const [isCheckSelectedGenreMsgError, setIsCheckSelectedGenreMsgError] = useState("El campo 'Is CheckSelected Genre' esta vacío")



    const closeModal = () => {
        setStatusModal(!true)
    }

    return (
        <>
            {statusModal && (
                <div className='fixed top-0  z-50  h-[100vh] w-full bg-[#000000b0]'>
                    <div className='relative p-4 w-full  h-[100vh] items-center justify-center flex '>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                            <button onClick={closeModal}
                                type='button'
                                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                                data-modal-toggle='popup-modal'>
                                <svg
                                    aria-hidden='true'
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fill-rule='evenodd'
                                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                        clip-rule='evenodd'></path>
                                </svg>
                            </button>
                            <div className='p-6 text-center'>
                                <svg
                                    aria-hidden='true'
                                    className='mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                                <h3 className='mb-4 text-lg font-normal text-gray-500 dark:text-gray-400'>
                                    Necesitas rellenar todos los campos del formulario
                                </h3>
                                <div className=' text-lg font-normal text-gray-500 dark:text-gray-500'>
                                    Los campos que faltan son:
                                    <div class=" mb-4 rounded-lg">
                                        {title === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {titleMsgError}
                                        </span>)}
                                        {description === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {descriptionMsgError}
                                        </span>
                                        )}
                                        {categorie === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {categorieMsgError}
                                        </span>
                                        )}
                                        {status === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {statusMsgError}
                                        </span>
                                        )}
                                        {duration === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {durationMsgError}
                                        </span>
                                        )}
                                        {studio === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {studioMsgError}
                                        </span>
                                        )}
                                        {country === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {countryMsgError}
                                        </span>
                                        )}
                                        {director === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {directorMsgError}
                                        </span>
                                        )}
                                        {producer === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {producerMsgError}
                                        </span>
                                        )}
                                        {premiere === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {premiereMsgError}
                                        </span>
                                        )}
                                        {rating === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {ratingMsgError}
                                        </span>
                                        )}
                                        {award === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {awardMsgError}
                                        </span>
                                        )}
                                        {protagonistsList[0] === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {protagonistsListMsgError}
                                        </span>
                                        )}
                                        {genreList[0] === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {genreListMsgError}
                                        </span>
                                        )}
                                        {backdrop_path === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {backdrop_pathMsgError}
                                        </span>
                                        )}
                                        {poster_path === "" && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {poster_pathMsgError}
                                        </span>
                                        )}
                                         {isCheckSelectedGenre.length < 1 && (<span class="block text-md font-medium text-gray-500 dark:text-gray-400">
                                            {isCheckSelectedGenreMsgError}
                                        </span>
                                        )}
                                    </div>
                                </div>
                                <button  onClick={closeModal}
                                    data-modal-toggle='popup-modal'
                                    type='button'
                                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'>
                                    Continuar en el Formulario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Alert
