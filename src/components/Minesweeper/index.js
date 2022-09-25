import React, { useEffect, useState } from "react";
import Block from "./block";

const height = 6;
const width = 5;
const numBombs = 5;

const Minesweeper = () => {
  const [flagOnClick, setFlagOnClick] = useState(false);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    setFields(generateFields(height, width, numBombs));
  }, []);

  const handleFlagButton = () => {
    setFlagOnClick((prev) => !prev);
  };

  const blocks =
    fields &&
    fields.map((block, i) => {
      return <Block key={i} blockElement={block} flagOnClick={flagOnClick} />;
    });

  return (
    <div
      style={{
        padding: "2px",
        background: "lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          paddingTop: "1em",
        }}
      >
        <p>squares left:</p>
        <button onClick={handleFlagButton}>
          flag {flagOnClick ? "y" : "n"}
        </button>
        <p>bombs: 10</p>
      </div>
      <div style={gridStyle(height, width)}>{blocks}</div>
    </div>
  );
};

export default Minesweeper;

const gridStyle = (height, width) => ({
  display: "grid",
  gridTemplateRows: `repeat(${height}, 50px)`,
  gridTemplateColumns: `repeat(${width}, 50px)`,
  gap: "2px",
  padding: "1em",
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const generateFields = (height, width, numBombs) => {
  let fields = [];
  let bombs = [
    ...[...new Array(numBombs)].map(() => true),
    ...[...new Array(height * width - numBombs)].map(() => false),
  ];
  shuffleArray(bombs);
  console.log(bombs);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let totalIndex = y * width + x;
      console.log(y, x, totalIndex);
      fields.push({
        x: x,
        y: y,
        neighborBombs: neighborBombs(bombs, totalIndex, height, width),
        isFlag: false,
        isBomb: bombs[totalIndex],
      });
    }
  }
  console.log(fields);
  return fields;
};


const neighborBombs = (bombs, totalIndex, height, width ) => {
  let numNeighborBombs = 0
  const rightEdge = (totalIndex % width) === width -1
  const leftEdge = (totalIndex % width) === 0
  const topEdge = totalIndex < width
  const bottomEdge = totalIndex >= ((height-1)*width)
  const indexesToCheck = [
    !topEdge && !leftEdge && totalIndex - width - 1,
    !topEdge && totalIndex - width,
    !topEdge && !rightEdge && totalIndex - width + 1,
    !leftEdge && totalIndex - 1,
    !rightEdge && totalIndex + 1,
    !bottomEdge && !leftEdge && totalIndex + width -1,
    !bottomEdge && totalIndex + width,
    !bottomEdge && !rightEdge && totalIndex + width +1,
  ];
  console.log(totalIndex, indexesToCheck)

  indexesToCheck.forEach(check => {
    if (typeof check === "number") {
      if (bombs[check]) {
        numNeighborBombs += 1
      }
    }
  })
  return numNeighborBombs
}