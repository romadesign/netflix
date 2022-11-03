import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import LayoutPincial from '../components/Layouts/LayoutPrincipal'
import styles from '../../styles/layout.module.css'
import AppLayout from '@/components/Layouts/AppLayout'

export default function Home() {
  const { user } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/browse',
  })

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
                  <img width={100} src='/img/logo.png' />
                </Link>
              </li>
            </div>
            <div>
              {user ? (
                <Link href="/dashboard">
                  <a className={styles.content_nav_session}>Dashboard</a>
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
