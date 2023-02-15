// import React from 'react'
// import draggable from'../../public/drag-indicator.svg'

// import "./WordContainer.css"

// function WordContainer({ word, index, onDragStart, onDragEnd, onDragEnter, onDragOver}) {
//   return (
//     <div 
//       draggable 
//       onDragStart={(event) => onDragStart(event, index)}
//       onDragEnter={onDragEnter}
//       onDragEnd={onDragEnd}
//       onDragOver={(event) => onDragOver(event)}
//       className="draggable-list-item">
//       <img  src={draggable} alt="drag-indicator" />
//       <p>{word}</p>

//     </div>
//   )
// }

// export default WordContainer

import React from 'react';

import draggable from'../../public/drag-indicator.svg'

import "./WordContainer.css"
// figure out how to make this container draggable

const WordContainer = ({ word, index, dragItem, dragOverItem, handleSort }) => {
  return (
    <li 
      draggable 
      onDragStart={(event) => dragItem.current = index} 
      onDragEnter={(event) => dragOverItem.current = index} 
      onDragEnd={handleSort} 
      onDragOver={(event) => event.preventDefault()} 
      className="draggable-list-item"
    >
      {word}
    </li>
  );
};

export default WordContainer;

