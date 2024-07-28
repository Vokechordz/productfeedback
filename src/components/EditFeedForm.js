import React, { useState } from 'react'
import left from '../images/left_10024989.png'
import styles from '../cssmodules/editfeedform.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteFeedbackMutation, useGetFeedbacksQuery, useUpdateFeedbackMutation } from '../features/feedbacks/feedbacksApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUserId } from '../auth/authSlice'

const EditFeedForm = ({feedback}) => {
    const userId= useSelector(selectCurrentUserId)

  const navigate= useNavigate()
  const { id } = useParams()

  const [updateFeedback, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateFeedbackMutation()

  const [deleteFeedback, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteFeedbackMutation()
  
/*   const { feedback } = useGetFeedbacksQuery("feedbacksList", {
    selectFromResult: ({ data }) => ({
        feedback: data?.entities[id]
    }),refetchOnMountOrArgChange: true, refetchOnFocus:true, pollingInterval:5000
})
 */
  const [title, setTitle] = useState(feedback.title)
  const [category, setCategory] = useState(feedback.category)
  const [details, setDetails] = useState(feedback.details)

  const onTitleChanged = e => setTitle(e.target.value)
  const onDetailsChanged = e => setDetails(e.target.value)
  const onCategoryChanged = e => setCategory(e.target.value)

  const onDeleteFeedbackClicked = async () => {
    await deleteFeedback({ id: feedback.id })
}

const created = new Date(feedback.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
const updated = new Date(feedback.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  

  const canSave = [title, category, details].every(Boolean)

  const onSaveFeedbackClicked = async (e) => {
    e.preventDefault()
      if (canSave) {
          await updateFeedback({ id: feedback.id, userId, title, category, details })
      }
  }

  console.log(feedback)

  if (!feedback) return <p>Loading...</p>
  //if (isDelSuccess) return <p>deleted</p>

  if (isDelSuccess) {
    navigate(`/dash`)
  }


    const content = (
      <div className={styles.newfeed}>
        <div className={styles.newfeed1}>
            <img src={left} alt="" />
            <Link onClick={()=> navigate(-1)} >Go Back</Link>
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
            <input 
                type="text" 
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="">
                <h3>Category</h3>
                <p>Choose a category for your feedback</p>
            </label>
            <select name="" id="" value={category} onChange={onCategoryChanged}>
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
            </select>
            <label htmlFor="">
                <h3>Feedback Title</h3>
                <p>Add a short, descriptive headline</p>
            </label>
            <textarea value={details} style={{height:'100px'}} maxLength='255' type="text" onChange={onDetailsChanged}/>
            <button onClick={onDeleteFeedbackClicked}>Delete</button>
            <button type='submit'>Save</button>
        </form>
    </div>
    )



  return content
}

export default EditFeedForm