import React, { useEffect, useState } from 'react'
import Block from './block'

const Minesweeper = () => {

  const [flagOnClick, setFlagOnClick] = useState(false)
  const [fields, setFields] = useState(null)

  useEffect(() => {
    setFields(generateFields(5,5,4))
  },[])

  const handleFlagButton = () => {
    setFlagOnClick(prev => !prev) 
  }


  

  const blocks = fields && fields.map((block, i) => {
    return <Block key={i} blockElement={block} flagOnClick={flagOnClick}/>
  } )

  return (
    <div style={{ padding: "2px", background: "lightgray", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1em', paddingTop: '1em'}}>
        <p>squares left:</p>
        <button onClick={handleFlagButton}>flag {flagOnClick ? "y" : "n"}</button>
        <p>bombs: 10</p>
      </div>
      <div style={gridStyle(5,5)}>
        {blocks}
      </div>
    </div>
  )
}

export default Minesweeper

const gridStyle = (width, height) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${height}, 50px)`,
  gridTemplateColumns: `repeat(${width}, 50px)`,
  gap: '2px',
  padding: '1em'
})

const generateFields = (height, width, numBombs) => {
  let fields = []
  let bombCount = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let GonnaBeBomb = bombCount < numBombs ? (Math.floor(Math.random() * 10) < 4) : false
      fields.push({ x: x, y: y, isFlag: false, isBomb: GonnaBeBomb,  })
      if (GonnaBeBomb) {
        bombCount = bombCount + 1
      }
    }
  }
  return fields
}