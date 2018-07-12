// Page: starter-page.html

const { remote } = require('electron');

// get global variables
const sess = remote.getCurrentWindow().webContents.session;

function clearCache() {
  sess.getCacheSize((size) => {
    console.log(`Size before: ${size}`);
    sess.clearCache(function() {
      console.log('cleared cache');
      sess.getCacheSize((size) => {
        console.log(`Size after: ${size}`);
      });
    });
  });
}

function clearStorage() {
  sess.clearStorageData(function() {
    console.log('cleared storage');
  });
}

function main() {
  const btnClearCache = document.getElementById('btn-clear-cache');
  btnClearCache.addEventListener('click', clearCache);

  const btnClearStorage = document.getElementById('btn-clear-storage');
  btnClearStorage.addEventListener('click', clearStorage);
}

// execution
main();

