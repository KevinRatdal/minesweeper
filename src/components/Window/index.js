import React from 'react'
import Content from './Content'
import styles from './index.module.css'
import Topbar from './Topbar'


const Window = () => {
  return (
    <div className={styles.gameWindow}>
      <Topbar />
      <Content /> 
    </div>
  )
}

export default Window