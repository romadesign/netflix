import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import LayoutPincial from '../components/Layouts/LayoutPrincipal'
import styles from '../../styles/layout.module.css'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  //Direccionando si esta logeado
//   const { login } = useAuth({
//     middleware: 'guest',
//     redirectIfAuthenticated: '/browse',
//   })

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <div>
        <div className={styles.content_navbar}>
          <div className={styles.content_links}>
            <div>
              <li className={styles.logo}>
                <Link href="/">
                  <a>NETFLIX</a>
                </Link>
              </li>
            </div>
            <div>
              {user ? (
                <Link href="/dashboard">
                  <a className="">Dashboard</a>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <a className={styles.login}>Iniciar sessión</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <LayoutPincial />
      </div>
    </>
  )
}
