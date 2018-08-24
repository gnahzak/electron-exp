// Page: starter-page.html

const { remote, webFrame } = require('electron');
const webframeUtil = require('../utils/webframe-resource-reporter-util');

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

  console.log('HTTPS cleared');
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

  const btnClearWebframe = document.getElementById('btn-webframe-clear');
  btnClearWebframe.addEventListener('click', webFrame.clearCache);

  // manually clear webframe cache by pressing 'c' key
  document.addEventListener('keydown', e => {
    if (e.key == 'c') {
      webframeUtil.clearWebframe();
    }
  });
}

// execution
main();

