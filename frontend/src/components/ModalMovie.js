import { useEffect, useState } from 'react'
import {
  FaPlay,
  FaPlus,
  FaRegArrowAltCircleDown,
  FaRegSmileBeam,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaStar,
} from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'

const ModalMovie = ({ movie, showModaltwo, setShowModaltwo, onMouse }) => {
  const { getCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var accountId = getCookie('accountId')
    var token = getCookie('token')
  }

  const closeModal = () => {
    setShowModaltwo(!true)
  }

  return (
    <div className='bg-[#000000e0]  '>
      <div className=''>
        <div
          onMouseLeave={onMouse}
          className='relative bg-white rounded-lg shadow dark:bg-[#141414] shadow-lg shadow-gray-500/300 md:w-[320px] '>
          <div className=''>
            <div className='md:flex md:flex-row pl-10 pr-10 pt-7'>
              <div className='basis-2/3 text-left'>
                <h4 className='text-xl font-extrabold text-gray-500 dark:text-gray-200 text-left  pt-2'>
                  Acerca de Los asd
                </h4>
                <span className='text-xs  text-gray-400 dark:text-gray-450'>
                  Creada por:{' '}
                  <p className='text-base  text-gray-500 dark:text-gray-200'>
                    aas
                  </p>
                </span>
                <span className='text-xs  text-gray-400 dark:text-gray-450'>
                  Premios:{' '}
                  <p className='text-base  text-gray-500 dark:text-gray-200'>
                    asas
                  </p>
                </span>
                <span className='text-xs  text-gray-400 dark:text-gray-450'>
                  País:{' '}
                  <p className='text-base  text-gray-500 dark:text-gray-200'>
                    asasas
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalMovie
