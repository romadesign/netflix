import React, { useState, useEffect } from 'react'
import styles from '../../../styles/browse.module.css'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Browse() {
  const router = useRouter()

  //redirect page si no es provedor
  const { getCookie, setCookie } = useAuth()
  if (typeof window !== 'undefined') {
    var userIdCookie = getCookie('id')
    var userTypeCookie = getCookie('type')
  }

  const [accounts, setAccounts] = useState()
  const [userId, setUserId] = useState(userIdCookie) //userId Login save, cookie get data
  const [userType, setUserType] = useState(userTypeCookie) //userId Login save, cookie get data
  const [image, setImage] = useState('')
  const [name, setName] = useState('')

  // hideRegister
  const [hiddenAddProfile, setHidenAddProfile] = useState(false)

  const handleClick = () => {
    hiddenAddProfile ? setHidenAddProfile(false) : setHidenAddProfile(true)
    setImage('')
    setName('')
  }

  useEffect(() => {
    userTypeCookie == 'client' ? router.push("/browse") : router.push('/provider');
    getAccounts()
  }, [])

  //Get Accounts user
  async function getAccounts() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/user/${userId}`,
    )
    const data = response.data
    if (data.length > 0) {
      setAccounts(data)
    }
  }

  //Post Account
  const postAccount = async () => {
    let formData = new FormData()
    formData.append('userId', userId)
    formData.append('userType', userType)
    formData.append('name', name)
    formData.append('image', image)
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`, formData)
      .then(function (response) {
        console.log(response)
        router.push("/browse")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleMovies = (acoundId) => {
    setCookie('accountId', acoundId)
    router.push("/films")
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
            <form>
              <div className={styles.content_card_add_user}>
                <Image
                  src="/img/perfil.png"
                  alt="Picture perfil"
                  datafiles={image}
                  setFile={setImage}
                />
                <Input
                  className={styles.input}
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>
              <div className={styles.content_button}>
                <Button onClick={postAccount}>Continuar</Button>
                <Button onClick={() => handleClick(hiddenAddProfile)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.content_general}>
          <div className={styles.content}>
            <h1>¿Quién eres? Elige tu perfil</h1>
            <div className={styles.content_card}>
              <div className={styles.content_card_option}>
                {accounts !== undefined &&
                  <div className={styles.card_account}>{
                    accounts.map((account) => (
                      <div
                        onClick={() => handleMovies(account.id)}
                        key={account.id} className="w-full max-w-sm p-2 cursor-pointer">
                        <img
                          src={"http://localhost:8000/profiles/" + account?.image}
                          alt={account.name}
                          width={150}
                          height={150}
                          className="rounded-md"
                        />
                        <span>{account.name}</span>
                      </div>
                    ))
                  }</div>
                }
              </div>
              <div className={styles.content_card_option}>
                <div className={styles.content_perfil}>
                  <div
                    className={styles.icon}
                    onClick={() => handleClick(hiddenAddProfile)}>
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
