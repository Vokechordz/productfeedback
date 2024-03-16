import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../cssmodules/login.module.css'
import { BeatLoader } from 'react-spinners'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../auth/authSlice'
import { useLoginMutation } from '../auth/authApiSlice'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"


    const content = (
        <section className={styles.login}>
           <div className={styles.rounddiv}>
               <p>+</p>
           </div>
            <header>
              <h1>Frontend Mentor Feedback Board</h1>
                <h2>Login</h2>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <div className={styles.buttondiv}>
                       <button onClick={()=> navigate('/create')}>Create</button>
                       <button>
                          {isLoading? <BeatLoader size={15} color='white'/>: 'Sign in'}
                       </button>
                    </div>
                </form>
            </main>
        </section>
    )

    return content
}
export default Login