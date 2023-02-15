/* global chrome */

import React, { useState, useEffect } from 'react';

const WordList = () => {
  const [dictionary, setDictionary] = useState([]);

  useEffect(() => {
    chrome.storage.local.get({ dictionary: [] }, (data) => {
      setDictionary(data.dictionary);
    });

    chrome.storage.onChanged.addListener((changes) => {
      Object.values(changes).forEach((key) => {
        const storageChange = changes[key];
        if (storageChange && storageChange.newValue && storageChange.newValue.length > storageChange.oldValue.length) {
          addNewElement();
        }
      });
    });
  }, []);

  const addNewElement = () => {
    chrome.storage.local.get({ dictionary: [] }, (data) => {
      setDictionary(data.dictionary);
    });
  };

  const addWordToDom = (word) => {
    return (
      <li className="collapsible" onClick={() => {
        this.classList.toggle('expand');
      }}>
        <li className="content">
        </li>
      </li>
    );
  };

  return (
    <ul id="dictionary">
      {dictionary.map((word) => addWordToDom(word))}
    </ul>
  );
};

export default WordList;
