// TODO: 
// /*global chrome*/
// var chrome = chrome || {};
var chrome;
// add the following - render each word to the extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled event fired');
  chrome.contextMenus.create({
    id: 'Save',
    title: 'Save word',
    contexts: ['selection']
      });
});


function checkIfWordExists(clickData, savedWords) {
  if (savedWords) {
    let wordExists = false;

    savedWords.forEach(wordObject => {            
      if (wordObject.word === clickData.selectionText) {
        wordExists = true;
        console.log(`The word ${clickData.selectionText} exists in the savedWords array.`);
        return wordExists;
      }
    });

    if (!wordExists) {
      console.log(`The word ${clickData.selectionText} does not exist in the savedWords array.`);
    }
    return wordExists;
  } else {
    console.log("No words have been saved yet.");
  }
}



//   run fetch of the word - 
// if it's an invalid word, or one not recognised by the api
// then notify the user - prompt them to sell


  chrome.contextMenus.onClicked.addListener((clickData) => {
      console.log('onClicked event fired');
  
    // Retrieve the current data in local storage
      chrome.storage.local.get("words", (result) => {
      // Check if the words array exists
      if (result.words === undefined || result.words.length === 0) {
          result.words = [];
      }

      // Add a new word object to the words array
      // result.words.push({word: clickData.selectionText, timestamp: new Date()});

      // Here, check if the word already 
      
      // https://api.dictionaryapi.dev/api/v2/entries/en/<word>
      
      });
      
    // TODO: if the word exists - move it to the top of the array. 
    // TODO: increment counter, and render how many times the word has been saved to the frontend. 
      chrome.storage.local.get("words", (result) => {
          let savedWords = result.words;
          const wordExists = checkIfWordExists(clickData, savedWords);
            if (wordExists) {
                // do not add to dict
                var notificationId = 'word_exists'; 
                // Options for the notification
                var options = {
                    type: 'basic',
                    iconUrl: 'bell.png',
                    title: 'Word Exists',
                    message: `The word "${clickData.selectionText}" exists in the dictionary.`,
                };

                var creationCallback = function() {
                    console.log('Notification created');
                };

                chrome.notifications.create(notificationId, options, creationCallback);

                // Close the notification after 5 seconds
                setTimeout(function() {
                    chrome.notifications.clear(notificationId, function() {
                        console.log('Notification closed');
                    });
                }, 5000);            
            } else {
              result.words.push({word: clickData.selectionText});
              // Save the updated words array to local storage
              chrome.storage.local.set({ "words": result.words }, () => {
              console.log('Data saved to local storage:', result.words);
          });
            }
        });
      
  });
  
