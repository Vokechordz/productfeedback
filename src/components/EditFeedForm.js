import React, { useState } from 'react'
import left from '../images/left_10024989.png'
import styles from '../cssmodules/editfeedform.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'

const EditFeedForm = ({feedback}) => {

  const navigate= useNavigate()
  const { id } = useParams()
  
/*   const { feedback } = useGetFeedbacksQuery("feedbacksList", {
    selectFromResult: ({ data }) => ({
        feedback: data?.entities[id]
    }),refetchOnMountOrArgChange: true, refetchOnFocus:true, pollingInterval:5000
})
 */
  const [title, setTitle] = useState("")
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onCompletedChanged = e => setCompleted(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)



  if (!feedback) return <p>Loading...</p>


    const content = (
      <div className={styles.newfeed}>
        <div className={styles.newfeed1}>
            <img src={left} alt="" />
            <Link onClick={()=> navigate(-1)} >Go Back</Link>
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
            <input 
                type="text" 
                value={feedback.title}
                onChange={onTitleChanged}
            />
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



  return content
}

export default EditFeedForm