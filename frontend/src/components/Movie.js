import { useState } from 'react';
import { FaHeart, FaPlay, FaPlus, FaRegArrowAltCircleDown, FaRegHeart, FaRegSmileBeam, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios'
import { useAuth } from '@/hooks/auth';
import ModalDetails from './ModalDetails';

const Movie = ({ item }) => {
    const { getCookie } = useAuth()
    if (typeof window !== 'undefined') {
        var accountId = getCookie('accountId')
        var token = getCookie('token')
    }

    const [like, setLike] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [icons, setIcons] = useState(false)
    const onMouseLeave = () => setIcons(false);


    const handleModal = (movieId) => {
        console.log(movieId)
        setTimeout(function () {
            setShowModal(!false)
        }, 400);
    }

    const showIcons = () => {
        setIcons(!false)
    }

    const addListMovie = async (film_id) => {
        let formData = new FormData()
        formData.append('film_id', film_id)
        formData.append('account_id', accountId)
        await axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`, formData,
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            .then(function (response) {
                console.log(response)
                // router.push("/")
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div className="container">
            <div className="card">
                <div className="face faceOne">
                    {/* <div onClick={() => handleModaltwo(item.id)} className={`${style.content } sm:w-[100px] md:w-[200px] lg:w-[320px] lg:w-[320px] inline-block cursor-pointerp-[1px] `}> */}
                    <div className="content">
                        <img className='' src={"http://localhost:8000/images/" + item?.backdrop_path} alt={item?.title} />
                    </div>
                </div>
                <div className="face faceTwo">
                    <div className="content">
                        <div className="flex justify-between pl-5 pr-5 pt-7 pb-3 items-center ">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-between">
                                    <FaPlay className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300  " />
                                    <FaPlus
                                        onClick={() => addListMovie(item.id)}
                                        className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
                                </div>
                                <div className="flex justify-between"
                                    onMouseEnter={showIcons}
                                    onMouseLeave={onMouseLeave}
                                >
                                    {!icons ?
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
                                <FaRegArrowAltCircleDown onClick={() => handleModal(item.id)} className=" ml-2 mr-2 text-2xl cursor-pointer text-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal !== false &&
                <ModalDetails showModal={showModal} setShowModal={setShowModal} movie={item} />
            }

            <style jsx>{`
                  .container {
                    position: relative;
                    top: -45px;
                    width: 300px;
                    height: 261px;
                  }
                  .container .card {
                    cursor: pointer;
                  }

                  .container .card:hover {
                    z-index: 3;
                    transition: 0.5s;
                    width: 300px;
                  }

                  .container .card .face {
                    width: 300px;
                    transition: 0.7s;
                  }

                  .container .card .face.faceOne{
                    position: relative;
                    z-index: 1;
                    transform: translateY(100px);
                  }

                  .container .card:hover .face.faceOne{
                    transform: translateY(46px);
                  }

                  .container .card .face.faceOne .content {
                    transition: 0.5;
                  }

                  .container .card .face.faceTwo{
                    background: #141414;
                    transform: translateY(-71px);
                  }

                  .container .card:hover .face.faceTwo {
                    transform: translateY(34px);
                  }
            `}</style>
        </div>
    )
}

export default Movie

// 'image' => fake()->imageUrl($width=400, $height=400)

