import styles from '../cssmodules/editfeed.module.css'
import { Link, useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../features/users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import chat from '../images/chat_10802188.png'
import caretup from '../images/arrow_5475249.png'
import left from '../images/left_10024989.png'
import EditFeedForm from './EditFeedForm'
import { useSelector } from 'react-redux'
import { selectCurrentUserId } from '../auth/authSlice'
import Feedback from './Feedback'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import CommentSection from './CommentSection'

const EditFeed = () => {
    
    const { id: feedbackId } = useParams()

    const userId= useSelector(selectCurrentUserId)
    console.log(userId.userId)

    const { feedback } = useGetFeedbacksQuery("usersList", {
        selectFromResult: ({ data }) => ({
            feedback: data?.entities[feedbackId]
        }),
    })


    if (!feedback) return <p>loading...</p>


    return (
        <div className={styles.editfeed}>
        <div className={styles.editfeedm}>
           <div className={styles.editfeed1}>
              <img src={left} alt="" />
              <Link to="/dash">Go Back</Link>
           </div>
           <button>Edit Feedback</button>
        </div>

             <div className={styles.comments}>
            <button className={styles.firstbtn}>
                <img src={caretup} alt="" />
                <p>{feedback.likes}</p>
            </button>
        
            <div className={styles.comments2}>
                <h2>{feedback.title}</h2>
                <p>{feedback.details}</p>
                <button>{feedback.category}</button>
            </div>
        
            <div className={styles.comments3}>
                <img src={chat} alt="" />
                <p>2</p>
            </div>
        
        </div>

        <CommentSection feedbackId={feedbackId} />
        </div>
    )


 
}
export default EditFeed