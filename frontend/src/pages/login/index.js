import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/login.module.css'
import styleslayout from '../../../styles/layout.module.css'

const Login = () => {
  const router = useRouter()
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/browse',
  })

  const [email, setEmail] = useState('romacode@gmail.com')
  const [password, setPassword] = useState('romacode')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm = async event => {
    event.preventDefault()
    login({ email, password, setErrors, setStatus })
  }

  return (
    <>
      <div className={styleslayout.content_navbar}>
        <div className={styleslayout.content_links}>
          <div>
            <li className={styleslayout.logo}>
              <Link href='/'>
                <img width={100} src='/img/logo.png' />
              </Link>
            </li>
          </div>
          <div>
            <Link href='/'>
              <a className={styleslayout.styleslayout}>Registrar</a>
            </Link>
          </div>
        </div>
      </div>
      <section className={styles.content}>
        <div className={styles.content_data}>
          <img className={styles.imgLayout} src='/img/background.jpg' />
          <div className={styles.concord_img_gradient}></div>
          <div className={styles.conent_login}>
            <div className={styles.background}>
              <div className={styles.with_content}>
                <h4>Iniciar sesión</h4>
                {/* Session Status */}
                <AuthSessionStatus status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors errors={errors} />
                {/* form login */}
                <form onSubmit={submitForm}>
                  <Input
                    className={styles.inputs}
                    type='email'
                    placeholder='Dirección de correo electronico'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button className={styles.button}>Iniciar sesión</button>
                </form>
                <div className={styles.content_options}>
                  <div className={styles.check}>
                    <Input type='checkbox' />
                    <span>Recúerdame</span>
                  </div>
                  <h6>¿Necesitas ayuda? </h6>
                </div>
                <h5>
                  ¿Todavía sin Netflix? <a href='/'>Suscríbete ya.</a>
                </h5>
                <h6>
                  Esta página utiliza Google reCAPTCHA para garantizar que no
                  eres un robot.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
