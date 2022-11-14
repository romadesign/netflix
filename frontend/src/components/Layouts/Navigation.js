import Dropdown from '@/components/Dropdown'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import styles from '../../../styles/navbar.module.css'
import { Api } from '@/hooks/api'

const Navigation = ({ user }) => {
  const router = useRouter()
  const { logout, getCookie, setCookie } = useAuth()
  const { apiGetAccountId, apiGetAccountsByUser, apiGetImageProfile } = Api()
  const [open, setOpen] = useState(false)
  if (typeof window !== 'undefined') {
    var accountId = getCookie('accountId')
    var userIdCookie = getCookie('id')
  }

  const [id, setId] = useState(accountId)
  const [userId, setUserId] = useState(userIdCookie)
  const [accounts, setAccounts] = useState()
  const [account, setAccount] = useState()
  const [accountGetId, setAccountGetId] = useState()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useMemo(() => {
    //Get AccountId
    async function getAccountUser () {
      apiGetAccountId(id)
        .then(res => {
          const data = res.data
          setAccount(data)
          setAccountGetId(data.id)
          setCookie('name', data.name)
        })
        .catch(error => {
          console.log(error, 'entro') // "oh, no!"
        })
    }
    getAccountUser()
  }, [])

  useMemo(() => {
    async function getAccounts () {
      apiGetAccountsByUser(userId)
        .then(res => {
          const data = res.data
          if (data.length > 0) {
            setAccounts(data)
          }
        })
        .catch(error => {
          console.log(error, 'entro') // "oh, no!"
        })
    }
    getAccounts()
  }, [userId])

  const handleSend = e => {
    console.log(e)
    setCookie('accountId', e)
    router.reload()
  }

  return (
    <>
      <nav className={styles.content_navbar_principal}>
        <div
          className={`${
            isScrolled
              ? styles.content_style_navbarTransition_ease_in_out
              : styles.content_style_navbarTransition_int
          }`}>
          {/* Primary Navigation Menu */}
          <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 '>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                {/* Logo */}
                <div className='flex-shrink-0 flex items-center'>
                  <NavLink href='/films' active={router.pathname === '/films'}>
                    <img width={100} src='/img/logo.png' />
                  </NavLink>
                  <div className={styles.content_navbar}>
                    <NavLink
                      href='/films'
                      active={router.pathname === '/films'}>
                      Inicio
                    </NavLink>
                    <NavLink
                      href='/series'
                      active={router.pathname === '/series'}>
                      Series Tv
                    </NavLink>
                    <NavLink
                      href='/peliculas'
                      active={router.pathname === '/peliculas'}>
                      Películas
                    </NavLink>
                    <NavLink href='/list' active={router.pathname === '/list'}>
                      Mi lista
                    </NavLink>
                    <NavLink
                      href='/explore'
                      active={router.pathname === '/explore'}>
                      Explorar por idiomas
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Settings Dropdown */}
              <div className='hidden sm:flex sm:items-center sm:ml-6  '>
                <Dropdown
                  align='right'
                  width='48'
                  trigger={
                    <button className='flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out  '>
                      <div>
                        {router.pathname === '/provider' ? (
                          <> {user?.name} </>
                        ) : (
                          <>
                            {account !== undefined && (
                              <div>
                                <img
                                  src={apiGetImageProfile(account.image)}
                                  alt={account.name}
                                  className='rounded-md object-cover h-10 w-10'
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className='ml-1 '>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    </button>
                  }>
                  {/* Authentication */}
                  {accounts !== undefined && (
                    <>
                      {accounts.map(account => {
                        if (account.id !== accountGetId) {
                          return (
                            <div
                              key={account.id}
                              className='flex p-2'
                              onClick={() => handleSend(account.id)}>
                              <img
                                src={apiGetImageProfile(account.image)}
                                alt={account.name}
                                className='rounded-md object-cover h-10 w-10'
                              />
                              <button
                                className={`w-full text-left  px-4 py-2 text-sm leading-5 text-gray-400`}>
                                {account.name}
                              </button>
                            </div>
                          )
                        }
                      })}{' '}
                    </>
                  )}
                  <DropdownButton onClick={logout}>
                    Cerrar sessión
                  </DropdownButton>
                </Dropdown>
              </div>

              {/* Hamburger */}

              <div className='-mr-2 flex items-center sm:hidden '>
                {router.pathname === '/provider' ? (
                  <>
                    <div className='-mr-2 flex items-center sm:hidden'>
                      <button
                        onClick={() => setOpen(open => !open)}
                        className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'>
                        <svg
                          className='h-6 w-6'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 24 24'>
                          {open ? (
                            <path
                              className='inline-flex'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          ) : (
                            <path
                              className='inline-flex'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M4 6h16M4 12h16M4 18h16'
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {account !== undefined && (
                      <div>
                        <img
                          onClick={() => setOpen(open => !open)}
                          src={apiGetImageProfile(account.image)}
                          alt={account.name}
                          width={50}
                          height={50}
                          className='rounded-lg inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Navigation Menu */}
          {open && (
            <div className='py-1 bg-black bg-opacity-90'>
              <div className='pt-2 pb-3 space-y-1'>
                <ResponsiveNavLink
                  href='/dashboard'
                  active={router.pathname === '/dashboard'}>
                  Dashboard
                </ResponsiveNavLink>
              </div>

              {/* Responsive Settings Options */}
              <div className='pt-4 pb-1 border-t border-gray-200'>
                <div className='flex items-center px-4'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-10 w-10 fill-current text-gray-400'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>

                  <div className='ml-3'>
                    <div className='font-medium text-base text-gray-800'>
                      {user?.name}
                    </div>
                    <div className='font-medium text-sm text-gray-500'>
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div className='mt-3 space-y-1'>
                  {/* Authentication */}
                  <ResponsiveNavButton onClick={logout}>
                    Logout
                  </ResponsiveNavButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
