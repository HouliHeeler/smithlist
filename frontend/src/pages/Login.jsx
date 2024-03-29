import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import logo from '../app/images/logoblack.svg'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  const browse = (e) => {
    e.preventDefault()

    const userData = {
        email: "test@user.com", 
        password: "1234",
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <img src={logo} alt="Smithlist Logo" />
          <div className='form-group'>
            <input
              type='email'
              className='form-input'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-input'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div className='form-submit'>
            <button type='submit' className='btn btn-block'>
              Login
            </button>
            <button onClick={browse} className='btn btn-block'>Just Looking?</button>
            <span>
              <Link to='/register'>
                Register
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
