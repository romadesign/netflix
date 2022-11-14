import styles from '../../../styles/register.module.css'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Register = () => {
  //getdata with ruta
  const router = useRouter()
  const query = router.query
  const emailGetUrl = query.email

  // hideRegister
  const [hiddenRegister, setHidenRegister] = useState(false)

  const handleClick = () => {
    setHidenRegister(true)
  }

  const { register, user } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/browse',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState(emailGetUrl)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    })
  }

  return (
    <div>
      <div className={styles.content_navbar}>
        <div className={styles.content_links}>
          <div>
            <li className={styles.logo}>
              <Link href='/'>
                <img width={100} src='/img/logo.png' />
              </Link>
            </li>
          </div>
          <div>
            {user ? (
              <Link href='/dashboard'>
                <a className=''>Dashboard</a>
              </Link>
            ) : (
              <>
                <Link href='/login'>
                  <a className={styles.login}>Iniciar sessión</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {hiddenRegister ? (
        <div className={styles.with_content_input_register}>
          <GuestLayout>
            {/* Validation Errors */}
            <AuthValidationErrors className='mb-4' errors={errors} />
            <div>
              <span>PASO 1 DE 3</span>
              <h1>Crea una contraseña para empezar la suscripción.</h1>
              <p>¡Faltan solo algunos pasos!</p>
              <p>También odiamos el papeleo.</p>
            </div>
            <form onSubmit={submitForm}>
              {/* Name */}
              <div>
                <Label htmlFor='name'>Name</Label>

                <Input
                  id='name'
                  type='text'
                  value={name}
                  className='block mt-1 w-full'
                  onChange={event => setName(event.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Email Address */}
              <div className='mt-4'>
                <Label htmlFor='email'>Email</Label>

                <Input
                  id='email'
                  type='email'
                  value={email}
                  className='block mt-1 w-full'
                  onChange={event => setEmail(event.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className='mt-4'>
                <Label htmlFor='password'>Contraseña</Label>

                <Input
                  id='password'
                  type='password'
                  value={password}
                  className='block mt-1 w-full'
                  onChange={event => setPassword(event.target.value)}
                  required
                  autoComplete='new-password'
                />
              </div>

              {/* Confirm Password */}
              <div className='mt-4'>
                <Label htmlFor='passwordConfirmation'>
                  Confirmar contraseña
                </Label>

                <Input
                  id='passwordConfirmation'
                  type='password'
                  value={passwordConfirmation}
                  className='block mt-1 w-full'
                  onChange={event =>
                    setPasswordConfirmation(event.target.value)
                  }
                  required
                />
              </div>

              <button className={styles.button}>Siguiente</button>
            </form>
          </GuestLayout>
        </div>
      ) : (
        <div>
          <div className={styles.content_center}>
            <div className={styles.content_titles}>
              <div>
                <div>
                  <span>PASO 1 DE 3</span>
                  <h1>Termina de configurar tu cuenta</h1>
                  <p>
                    Netflix personalizado para ti. Crea una contraseña para ver
                    Netflix en cualquier dispositivo a la vez.
                  </p>
                </div>
                <div onClick={() => handleClick()}>
                  <button>Siguiente</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
