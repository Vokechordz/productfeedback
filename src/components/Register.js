import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../cssmodules/login.module.css'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useAddNewUserMutation } from '../features/users/usersApiSlice'

const Register = () => {

    const USER_REGEX = /^[A-z]{3,20}$/
    const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/



    const userRef = useRef()
    const errRef = useRef()
    const [profilepic, setProfilepic] = useState(null);
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()


        useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

   /*  useEffect(() => {
        if (isSuccess) {
            setName('')
            setProfilepic('')
            setUsername('')
            setPassword('')
            navigate('/')
        }
    }, [isSuccess, navigate]) */




    //const canSave = [ validName, validUsername, validPassword].every(Boolean) && !isLoading && profilepic

    const canSave = name && profilepic && username && password && name !== 'undefined' && profilepic !== 'undefined' && username !== 'undefined' && password !== 'undefined';

   
    const handleProfilePicChange = (e) => {
      setProfilepic(e.target.files[0]);
    };


    const handleNameInput = (e) => setName(e.target.value)
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    console.log(profilepic)

    const handleAddNewUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('profilepic', profilepic); // Add the file object to the form data
    
            const response = await axios.post('http://localhost:3500/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle success response here
            console.log(response.data);
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    };

/* 
    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('profilepic', profilepic); // Make sure profilepic is defined
    
            const res = await addNewUser(formData);
            console.log(res);
        }
    } */

    console.log('Name:', name);
console.log('Username:', username);
console.log('Password:', password);
console.log('Profile Pic:', profilepic);


    const content = (
        <section className={styles.login}>
           <div className={styles.rounddiv}>
               <p>+</p>
           </div>
            <header>
              <h1>Frontend Mentor Feedback Board</h1>
                <h2>Create an account</h2>
            </header>
            <main className="login">
                <p ref={errRef} aria-live="assertive">{errMsg}</p>

                <form className={styles.form} onSubmit={handleAddNewUser} encType='multipart/form-data'>
                    <label htmlFor="profilepic">Profile Pic:</label>
                    <input
                        name='profilepic'
                        type="file"
                        onChange={handleProfilePicChange}
                        required
                    />
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        ref={userRef}
                        value={name}
                        onChange={handleNameInput}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <div className={styles.buttondiv}>
                       <button type='submit'>
                          {isLoading? <BeatLoader size={15} color='white'/>: 'Create'}
                       </button>
                      
                    </div>
                </form>
            </main>
        </section>
    )

    return content
}
export default Register