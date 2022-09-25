import React, { useState } from 'react'
import {ReactComponent as Mine} from './mine.svg'
import {ReactComponent as Flag} from './flag.svg'


const Block = (props) => {
  const { flagOnClick, blockElement} = props
  const [clicked, setClicked] = useState(false)
  const [flagged, setFlagged] = useState(false)
  //const [bomb, setBomb] = useState(false)

  const handleClick=(e) => {
    console.log(e)
    if (!clicked) {
      if ( flagOnClick ) {
        setFlagged(prev => !prev)
      } else if (!flagged) {
        setClicked(prev => !prev)
      }
    }
  }

  return (
    <div 
      onClick={handleClick}
      style={{ 
        width: '100%', 
        height: '100%', display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: clicked ? 'lightgrey' : 'darkgrey', 
        border: clicked ? '2px solid darkgray' : '2px solid black', 
        overflow: 'hidden'
      }}>
      {clicked ? 
        blockElement.isBomb ? 
          <Mine width="40px"/> :
          <span>{blockElement?.value}</span>
      :
      flagged ? 
          <Flag width="40px" />
      :
        null
      }
    </div>
  )
}

export default Block