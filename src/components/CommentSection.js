import React, { useState } from 'react'
import styles from '../cssmodules/commentsect.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetCommentsQuery } from '../features/comments/commentsApiSlice'
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReplySection from './ReplySection';

const CommentSection = ({ feedbackId }) => {

    const [replyForms, setReplyForms] = useState({});

    const toggleReplyForm = (commentId) => {
        setReplyForms((prevForms) => ({
          ...prevForms,
          [commentId]: !prevForms[commentId],
        }));
      };

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
                                   <img src={`http://localhost:3500/userImages/${user.profilepic}`} alt='p' />
                                    <div className={styles.thirdcom}>
                                        <h3>{user.name}</h3>
                                        <p>@{user.username}</p>
                                        <p>{comment.content}</p>
                                        {replyForms[comment._id] && (
                                            <form className={styles.form}>
                                               <input type="text" placeholder="Type your reply here" />
                                               <button type="submit">Post Reply</button>
                                            </form>
                                        )}
                                    </div>
                                    <a onClick={() => toggleReplyForm(comment._id)}>Reply</a>
                                        <FontAwesomeIcon className={styles.icon} role='button' icon={faTrash}/>
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