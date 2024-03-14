import React from 'react'
import left from '../images/left_10024989.png'
import styles from '../cssmodules/newfeed.module.css'
import { Link, useNavigate } from 'react-router-dom'

const NewFeed = () => {

    const navigate= useNavigate()
  return (
    <div className={styles.newfeed}>
        <div className={styles.newfeed1}>
            <img src={left} alt="" />
            <Link to="/dash">Go Back</Link>
        </div>

        <div className={styles.rounddiv}>
            <p>+</p>
        </div>

        <form action="" className={styles.formfeed}>
            <h1>Create New Feedback</h1>
            <label htmlFor="">
                <h3>Feedback Title</h3>
                <p>Add a short, descriptive headline</p>
            </label>
            <input type="text" />
            <label htmlFor="">
                <h3>Category</h3>
                <p>Choose a category for your feedback</p>
            </label>
            <select name="" id="">
                <option value="">Feature</option>
                <option value="">UI</option>
                <option value="">UX</option>
                <option value="">Enhancement</option>
                <option value="">Bug</option>
            </select>
            <label htmlFor="">
                <h3>Feedback Title</h3>
                <p>Add a short, descriptive headline</p>
            </label>
            <textarea style={{height:'100px'}} maxLength='255' type="text" />
            <button>Add Feedback</button>
        </form>
    </div>
  )
}

export default NewFeed