import React from 'react'
import styles from '../cssmodules/replysect.module.css'
import { useGetRepliesQuery } from '../features/replies/repliesApiSlice';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ReplySection = ({ commentId, userId }) => {

    const {
        data: replies,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRepliesQuery('repliesList', {
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

    const { entities }= replies

    const repliesData= Object.values(entities)
    const filteredRepliesData = repliesData.filter(reply => reply.commentId === commentId);

    const usersData= Object.values(users.entities)

    const filteredUsers= usersData.filter(user=> user._id=== userId)

    console.log(filteredUsers.username)


    const content= (
        <div className={styles.content}>
            {filteredRepliesData.map((reply)=>(
                <div className={styles.firstcom}>
                    {usersData.map((user)=> {
                        if (user._id=== reply.userId) {
                            return (
                                <div className={styles.secondcom}>
                                    <img src={user.profilepic} alt='p' />
                                    <div className={styles.thirdcom}>
                                        <h3>{user.name}</h3>
                                        <p>@{user.username}</p>
                                        <p>
                                            {filteredUsers.map((user)=> {
                                                return <p style={{color:'blue',fontWeight:'bold'}}>@{user.username}</p> 
                                            })}
                                            {reply.content}
                                        </p>
                                    </div>
                                        <FontAwesomeIcon className={styles.icon} role='button' icon={faTrash}/>
                                </div>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )




  return content
}

export default ReplySection