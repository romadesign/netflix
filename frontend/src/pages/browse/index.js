import React, { useState } from 'react'
import styles from '../../../styles/browse.module.css'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Head from 'next/head'


export default function Browse() {
  // hideRegister
  const [hiddenAddProfile, setHidenAddProfile] = useState(false)

  const handleClick = () => {
    hiddenAddProfile ? setHidenAddProfile(false) : setHidenAddProfile(true)
  }

  return (
    <div>
         <Head>
        <title>Netflix</title>
      </Head>
      {hiddenAddProfile ? (
        <div className={styles.content_general}>
          <div className={styles.content}>
            <div>
              <h1>Añadir perfil</h1>
              <h2>Crea un perfil para otra persona que usa Netflix.</h2>
            </div>
            <div className={styles.content_card_add_user}>
              <Image
                src="/img/perfil.png"
                alt="Picture perfil"
                width="120vw"
                height="120vw"
              />
              <Input type="text" placeholder="Nombre" className={styles.input}/>
            </div>
            <div className={styles.content_button}>
              <Button>Continuar</Button>
              <Button onClick={() => handleClick(hiddenAddProfile)}>Cancelar</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.content_general}>
          <div className={styles.content}>
            <h1>¿Quién eres? Elige tu perfil</h1>
            <div className={styles.content_card}>
              <div className={styles.content_card_option}>
                <Image
                  src="/img/img.png"
                  alt="Picture of the author"
                  width="120vw"
                  height="120vw"
                />
                <span>Mary</span>
              </div>
              <div className={styles.content_card_option}>
                <Image
                  src="/img/img.png"
                  alt="Picture of the author"
                  width="120vw"
                  height="120vw"
                />
                <span>Mary</span>
              </div>
              <div className={styles.content_card_option}>
                <Image
                  src="/img/img.png"
                  alt="Picture of the author"
                  width="120vw"
                  height="120vw"
                />
                <span>Mary</span>
              </div>
              <div className={styles.content_card_option}>
                <div className={styles.content_perfil}>
                  <div className={styles.icon} onClick={() => handleClick(hiddenAddProfile)}>
                    +
                  </div>
                  <span>Añadir perfil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
