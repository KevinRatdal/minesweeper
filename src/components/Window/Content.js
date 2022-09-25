import styles from './Content.module.css'
import React from 'react'
import Minesweeper from '../Minesweeper'


const Content = () => {
  return (
    <div className={styles.content}>
      <Minesweeper />
    
    </div>
  )
}

export default Content