import React from 'react'
import { bubble as Menu } from 'react-burger-menu'
import styles from '../cssmodules/hammenu.module.css'

const HamMenu = () => {

    const styless = {
        bmBurgerButton: {
          position: 'fixed',
          width: '24px',
          height: '18px',
          right: '36px',
          top: '55px'
        },
        bmBurgerBars: {
          background: 'white'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: ': rgb(241, 241, 248)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '0 8px',
          fontSize: '1.15em',
        },
        bmMorphShape: {
          fill: 'rgb(241, 241, 248)'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmItem: {
          display: 'inline-block'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        },
      }


  return (
    <div className={styles.hammenu}>
         <Menu  width={280} styles={styless} right>
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
                <p>3</p>
            </div>

            <div className={styles.dashthree4}>
            <ul><li>Live</li></ul>
                <p>1</p>
            </div>
        </div>
         </Menu>
    </div>
  )
}

export default HamMenu