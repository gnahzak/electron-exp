const { remote, webFrame } = require('electron');

function main() {

  const btnClearWebframe = document.getElementById('btn-webframe-clear');
  btnClearWebframe.addEventListener('click', webFrame.clearCache);

}

// execution
main();