import styles from '../cssmodules/dashboard.module.css'
import React from 'react'
import FirstDash from './FirstDash'
import SecondDash from './SecondDash'
import { bubble as Menu } from 'react-burger-menu'
import HamMenu from './HamMenu'

const Dashboard = () => {

  const showMenu= window.innerWidth < 660
 

  return (
    <div className={styles.dashboard}>
        <FirstDash />
        <HamMenu />
        <SecondDash />
    </div>
  )
}

export default Dashboard