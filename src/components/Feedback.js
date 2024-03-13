import React from 'react'
import styles from '../cssmodules/comments.module.css'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import chat from '../images/chat_10802188.png'
import caretup from '../images/arrow_5475249.png'

const Feedback = ({ feedbackId }) => {

    const { feedback } = useGetFeedbacksQuery("feedbacksList", {
        selectFromResult: ({ data }) => ({
            feedback: data?.entities[feedbackId]
        }),
    })
    console.log(feedback)


    if (feedback) {
        return (
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
          )
    } else return null


}

export default Feedback