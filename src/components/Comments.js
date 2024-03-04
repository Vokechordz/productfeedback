import React from 'react'
import styles from '../cssmodules/comments.module.css'
import chat from '../images/chat_10802188.png'
import caretup from '../images/arrow_5475249.png'

const Comments = () => {
  return (
    <div className={styles.comments}>
        <button className={styles.firstbtn}>
            <img src={caretup} alt="" />
            <p>112</p>
        </button>

        <div className={styles.comments2}>
            <h2>Add tags for solutions</h2>
            <p>Easier to search for solutions based on a specific stack</p>
            <button>Enhancement</button>
        </div>

        <div className={styles.comments3}>
            <img src={chat} alt="" />
            <p>2</p>
        </div>

    </div> //end of comments div
  )
}

export default Comments