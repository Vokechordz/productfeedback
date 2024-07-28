import styles from '../cssmodules/editfeed.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import CommentBox from './CommentBox'
import { useGetCommentsQuery } from '../features/comments/commentsApiSlice'

const EditFeed = () => {
    
    const { id: feedbackId } = useParams()
    const navigate= useNavigate()

    const userId= useSelector(selectCurrentUserId)
    console.log(userId)

    const { feedback } = useGetFeedbacksQuery("usersList", {
        selectFromResult: ({ data }) => ({
            feedback: data?.entities[feedbackId]
        }),
    })

    const {
        data: comments,
        isLoading: commentsLoading,
        isSuccess: commentsSuccess,
        isError: commentsError,
        error: commentsErrorDetail
    } = useGetCommentsQuery('commentsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    if (!feedback) {
        return <p>Loading feedback...</p>
    }

    if (commentsLoading) {
        return <p>Loading comments...</p>
    }

    if (commentsError) {
        return <p>Error loading comments: {commentsErrorDetail.message}</p>
    }

    const { entities } = comments
    const commentsData = Object.values(entities)
    const filteredCommentsData = commentsData.filter(comment => comment.feedbackId === feedbackId)
    const commentsCount = filteredCommentsData.length




    return (
        <div className={styles.editfeed}>
        <div className={styles.editfeedm}>
           <div className={styles.editfeed1}>
              <img src={left} alt="" />
              <Link to="/dash">Go Back</Link>
           </div>
           <button onClick={()=> navigate(`/dash/feedback/${feedbackId}/edit`)}>Edit Feedback</button>
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
                <p>{commentsCount}</p>
            </div>
        
        </div>

        <CommentSection feedbackId={feedbackId} />
        <CommentBox feedbackId={feedbackId}/>
        </div>
    )


 
}
export default EditFeed