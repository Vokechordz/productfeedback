import React, { useState } from 'react'
import left from '../images/left_10024989.png'
import styles from '../cssmodules/newfeed.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAddNewFeedbackMutation } from '../features/feedbacks/feedbacksApiSlice'
import { selectCurrentUserId } from '../auth/authSlice'

const NewFeed = () => {

    const navigate= useNavigate()

    const currentId= useSelector(selectCurrentUserId)
    const userId= currentId.userId
    console.log(userId)

    const [addNewFeedback, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewFeedbackMutation()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState('')


    const onTitleChanged = e => setTitle(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)
    const onContentChanged = e => setDetails(e.target.value)

    const canSave = [title, category, details].every(Boolean)

    const onSaveFeedbackClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            const res= await addNewFeedback({ userId, title, category, details })
            console.log(res)
        }
    }

    console.log(category)

  return (
    <div className={styles.newfeed}>
        <div className={styles.newfeed1}>
            <img src={left} alt="" />
            <Link to="/dash">Go Back</Link>
        </div>

        <div className={styles.rounddiv}>
            <p>+</p>
        </div>

        <form action="" className={styles.formfeed} onSubmit={onSaveFeedbackClicked}>
            <h1>Create New Feedback</h1>
            <label htmlFor="">
                <h3>Feedback Title</h3>
                <p>Add a short, descriptive headline</p>
            </label>
            <input onChange={onTitleChanged} value={title} type="text" />
            <label htmlFor="">
                <h3>Category</h3>
                <p>Choose a category for your feedback</p>
            </label>
            <select onChange={onCategoryChanged} value={category} name="" id="">
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
            </select>
            <label htmlFor="">
                <h3>Feedback Detail</h3>
                <p>Include any specific comments on what should be improved, added, etc.</p>
            </label>
            <textarea value={details} onChange={onContentChanged} style={{height:'100px'}} maxLength='255' type="text" />
            <button type='submit'>Add Feedback</button>
        </form>
    </div>
  )
}

export default NewFeed