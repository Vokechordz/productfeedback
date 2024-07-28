import React, { useState } from 'react'
import styles from '../cssmodules/commentsect.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteCommentMutation, useGetCommentsQuery } from '../features/comments/commentsApiSlice'
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReplySection from './ReplySection';
import { useAddNewReplyMutation } from '../features/replies/repliesApiSlice';

const CommentSection = ({ feedbackId }) => {

    const [replyForms, setReplyForms] = useState({});

    const toggleReplyForm = (commentId) => {
        setReplyForms((prevForms) => ({
          ...prevForms,
          [commentId]: !prevForms[commentId],
        }));
      };

      const[rep, setRep]= useState('')


  
      const [addNewReply, {
          isLoading: isReplyLoading,
          isSuccess: isReplySuccess,
          isError: isReplyError,
          error: replyError
      }] = useAddNewReplyMutation()

    const {
        data: comments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCommentsQuery('commentsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });


    const {
        data: users,
        isSuccess: isUsersSuccess
    } = useGetUsersQuery('usersList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [deleteComment, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCommentMutation()

  
    

    if (!isSuccess || !isUsersSuccess) return <p>Loading...</p>

    const { entities }= comments

    const commentsData= Object.values(entities)
    const filteredCommentsData = commentsData.filter(comment => comment.feedbackId === feedbackId);

    const usersData= Object.values(users.entities)

    console.log(usersData)

    const content= (
        <div className={styles.content}>
            <h2>2 comments</h2>
            {filteredCommentsData.map((comment)=>(
                <div className={styles.firstcom}>
                    {usersData.map((user)=> {
                        if (user._id=== comment.userId) {
                            return (
                                <div className={styles.secondcom}>
                                   <img src={`https://productfeedback-api-t6us.onrender.com/userImages/${user.profilepic}`} alt='p' />
                                    <div className={styles.thirdcom}>
                                        <h3>{user.name}</h3>
                                        <p>@{user.username}</p>
                                        <p>{comment.content}</p>
                                        {replyForms[comment._id] && (
                                            <form className={styles.form}>
                                               <input onChange={(e)=>setRep(e.target.value)} value={rep} type="text" placeholder="Type your reply here" />
                                               <button type="button" onClick={()=> addNewReply({ content: rep, userId: user._id, commentId: comment._id })}>Post Reply</button>
                                            </form>
                                        )}
                                    </div>
                                    <a onClick={() => toggleReplyForm(comment._id)}>Reply</a>
                                        <FontAwesomeIcon style={user._id=== comment.userId? null:{display:'none'}} onClick={()=> deleteComment({ id: comment.id })} className={styles.icon} role='button' icon={faTrash}/>
                                </div>
                            )
                        }
                    })}
                       <ReplySection commentId={comment._id} userId={comment.userId} />
                </div>
            ))}
        </div>
    )




  return content
}

export default CommentSection