import React from 'react'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import styles from '../../../styles/navbarProvider.module.css'

const RightBar = ({ user }) => {
  const router = useRouter()


  return (
    <div className={styles.content_nav}>
        <div className="sm:w-2/12 w-4/12 h-screen shadow-2xl">
      <div className=" border-b py-3 mt-1 flex justify-around ">
        <p className="text-xl  font-semibold">Dashboard {user?.name}</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">Options</h1>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
              <NavLink
                href="/provider/create"
                active={router.pathname === '/provider/create'}>
              Create films
            </NavLink>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-gray-400">Delegation</h1>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
              <p className="text-gray-600  ">Delegate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RightBar
