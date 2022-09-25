import React, { useState } from 'react'
import {ReactComponent as Mine} from './mine.svg'
import {ReactComponent as Flag} from './flag.svg'


const Block = (props) => {
  const { flagOnClick, blockElement} = props
  const [clicked, setClicked] = useState(false)
  const [flagged, setFlagged] = useState(false)
  //const [bomb, setBomb] = useState(false)
  const num = blockElement.neighborBombs

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
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: clicked ? "lightgrey" : "darkgrey",
        border: clicked ? "2px solid darkgray" : "2px solid black",
        overflow: "hidden",
      }}
    >
      {/* <p>
        ({blockElement.x},{blockElement.y}, {blockElement.neighborBombs})
      </p> */}
      {clicked ? (
        blockElement.isBomb ? (
          <Mine width="40px" />
        ) : (
          <Number number={num} />
        )
      ) : flagged ? (
        <Flag width="40px" />
      ) : null}
    </div>
  );
}

export default Block


const Number = ({number}) => {
  const numToCol = {
    0: "FFFFFF",
    1: "#0000FF",
    2: "#00FF00",
    3: "#FF0000",
    4: "#00008B",
    5: "#964B00",
    6: "#00FFFF",
    7: "#000000",
    8: "#808080",
  };

  return (
    <span 
      style={{
        color: numToCol[number]
      }}
    >
    {number !== 0 && number}
    </span>
  )
}