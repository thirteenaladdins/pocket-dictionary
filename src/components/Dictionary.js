/* global chrome */

import React, { useState, useEffect, useRef } from 'react';
import WordContainer from './WordContainer';
import "./Dictionary.css"

const Dictionary = () => {
  let [wordsArray, setWordsArray] = useState([]);

  useEffect(() => {
    chrome.storage.local.get('words', (result) => {
      console.log(result.words);
      setWordsArray(result.words);
    });
  }, []);

  const dragItem = useRef({ current: null });
  
  const dragOverItem = useRef(null);

  const handleSort = () => {
    const newWordsArray = [...wordsArray];
    const draggedItemContent = newWordsArray.splice(dragItem.current, 1)[0];
    newWordsArray.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setWordsArray(newWordsArray);
    chrome.storage.local.set({ words: newWordsArray });
  }

  return (
    <div className="dictionary scroller">  
      {wordsArray.map(({ word }, index) => (
        <li draggable
        onDragStart={(event) => dragItem.current = index}
        onDragEnter={(event) => dragOverItem.current = index}
        onDragEnd={handleSort}
        onDragOver={(event) => event.preventDefault()}
        className="draggable-list-item">
        {word}
      </li>

      ))}
    </div>
  );
};

export default Dictionary;


//    <WordContainer 
      //    word={word} 
      //    index={index} 
      //    onDragStart={() => dragItem.current = index}
      //    onDragEnter={() => dragOverItem.current = index}
      //    onDragEnd={handleSort}
      //    onDragOver={(event) => event.preventDefault()}
    //  />

{/* <li draggable
          onDragStart={(event) => dragItem.current = index}
          onDragEnter={(event) => dragOverItem.current = index}
          onDragEnd={handleSort}
          onDragOver={(event) => event.preventDefault()}
          className="draggable-list-item">
          {word}
        </li>
        // <WordContainer key={index} word={word} onDragStart={dragItem} 
        // onDragOver={dragOverItem} onDragEnd={handleSort} />
      ))} */}