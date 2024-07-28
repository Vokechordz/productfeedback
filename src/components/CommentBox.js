import React, { useState } from 'react'
import styles from '../cssmodules/commentbox.module.css'
import { selectCurrentUserId } from '../auth/authSlice'
import { useSelector } from 'react-redux'
import { useAddNewCommentMutation } from '../features/comments/commentsApiSlice'

const CommentBox = ({ feedbackId }) => {

    const userId= useSelector(selectCurrentUserId)

    const [content, setContent]= useState('')
    const max= 150

    const [addNewComment, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCommentMutation()

    const handleChange= e => {
        setContent(e.target.value)
    }

    
    const canSave = [content].every(Boolean)

    const onSaveCommentClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            const res= await addNewComment({ userId, feedbackId, content })
            //console.log(res)
            //setMsg(res.data?.message)
        }
    }

  return (
    <form className={styles.commentbox} onSubmit={onSaveCommentClicked}>
        <h3>Add Comment</h3>
        <textarea maxLength={max} value={content} onChange={handleChange} name="" id="" cols="30" rows="5" placeholder='Type your comment here'></textarea>
        <div className={styles.boxcap}>
            <p>{max - content.length} characters left</p>
            <button type='submit'>Post Comment</button>
        </div>
    </form>
  )
}

export default CommentBox