import React from 'react'
import styles from '../cssmodules/seconddash.module.css'
import bulb from '../images/bulb_1769253.png'
import caret from '../images/down-arrow_10495645.png'
import { useState } from 'react'

const SecondDash = () => {

  const [clicked, setClicked]= useState(false)
  const handleClicked= () => {
    setClicked(!clicked)
  }

  return (
    <div className={styles.seconddash}>
        <div className={styles.seconddash1}>
          <img className={styles.firstimage} src={bulb} alt="" />
          <h3>6 Suggestions</h3>

          <div  className={styles.dropdown}>
            <p>Sort by:</p>
          <button onClick={handleClicked} className={styles.dropbtn}><p>Most Upvotes</p> 
      <img src={caret} alt="" />
    </button>
    <div style={clicked? {display:'block'}: null} className={styles.dropdowncontent}>
      <a href="#">Most Upvotes</a>
      <a href="#">Least Upvotes</a>
      <a href="#">Most Comments</a>
      <a href="#">Least Comments</a>
    </div>
          </div> 
       
          <button>+ Add Feedback</button>
        </div>
    </div>
  )
}

export default SecondDash