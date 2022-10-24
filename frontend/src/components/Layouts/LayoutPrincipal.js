import Link from 'next/link'
import styles from '../../../styles/layout.module.css'
import React, { useState } from 'react'

export default function Layout () {
  const [dataEmail, setDataEmail] = useState({ emailGetUrl: '' })
  return (
    <div className={styles.content}>
      <div>
        <img className={styles.imgLayout} src='/img/background.jpg' />
        <div className={styles.concord_img_gradient}></div>
        <div className={styles.content_titles}>
          <div>
            <h1>Todas las películas y series que desees, y mucho más.</h1>
            <h3>Disfruta donde quieras. Cancela cuando quieras.</h3>
            <p>
              ¿Quieres ver algo ya? Escribe tu dirección de correo para crear
              una suscripción a Netflix o reactivarla.
            </p>
            <div className={styles.content_input}>
              <input
                type='text'
                placeholder='Dirección de correo'
                value={dataEmail.emailGetUrl}
                onChange={event =>
                  setDataEmail({
                    email: event.target.value,
                  })
                }
              />
              <Link
                href={{
                  pathname: '/register',
                  query: dataEmail, // the data email,
                }}
                as={`/register`}>
                <button>Empezar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
