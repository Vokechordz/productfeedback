import React from 'react'
import styles from '../cssmodules/comments.module.css'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import chat from '../images/chat_10802188.png'
import caretup from '../images/arrow_5475249.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCommentsQuery } from '../features/comments/commentsApiSlice'

const Feedback = ({ feedbackId }) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { feedback } = useGetFeedbacksQuery("feedbacksList", {
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
        <div className={styles.comments} onClick={() => navigate(`/dash/feedback/${feedbackId}`)}>
            <button className={styles.firstbtn}>
                <img src={caretup} alt="Like" />
                <p>{feedback.likes}</p>
            </button>
        
            <div className={styles.comments2}>
                <h2>{feedback.title}</h2>
                <p>{feedback.details}</p>
                <button>{feedback.category}</button>
            </div>
        
            <div className={styles.comments3}>
                <img src={chat} alt="Comments" />
                <p>{commentsCount}</p>
            </div>
        </div>
    )
}

export default Feedback
