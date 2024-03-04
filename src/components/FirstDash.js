import React from 'react'
import styles from '../cssmodules/firstdash.module.css'

const FirstDash = () => {



  return (
    <div className={styles.firstdash}>
        <div className={styles.dashone}>
            <h4>Frontend Mentor</h4>
            <p>Feedback board</p>
        </div>

        <div className={styles.dashtwo}>
            <div style={{display:'flex', flexDirection:'row', gap:'8px'}}>
                <button>All</button>
                <button>UI</button>
                <button>UX</button>
            </div>

            <div style={{display:'flex', flexDirection:'row', gap:'8px'}}>
                <button>Enhancement</button>
                <button>Feature</button>
            </div>

            <div>
                <button>Bug</button>
            </div>
        </div>

        <div className={styles.dashthree}>
            <div className={styles.dashthree1}>
                <h4>Roadmap</h4>
                <a href="">View</a>
            </div>

            <div className={styles.dashthree2}>
                <ul><li>Planned</li></ul>
                <p>2</p>
            </div>

            <div className={styles.dashthree3}>
            <ul><li>In-progress</li></ul>
                <p>2</p>
            </div>

            <div className={styles.dashthree4}>
            <ul><li>Live</li></ul>
                <p>2</p>
            </div>
        </div>
    </div>
  )
}

export default FirstDash