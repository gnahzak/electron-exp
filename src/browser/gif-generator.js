const gifUtil = require('../utils/gif-generator-util');

function main() {
  const btnGetGifs = document.getElementById('btn-submit');
  const inputQuery = document.getElementById('input-query');

  btnGetGifs.addEventListener('click', () => {
    console.log(inputQuery.value);
    gifUtil.printGifs(inputQuery.value);
    inputQuery.value = '';
  });

}

main();