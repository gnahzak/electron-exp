const { remote } = require('electron');

const gifsCat = require('../../static/gif-urls-cat');
const gifsFood = require('../../static/gif-urls-food');
const gifsDog = require('../../static/gif-urls-dog');

async function loadGifs() {
  const gifHolder = document.getElementById('gif-holder');
  const gifs = [...gifsCat.urls, ...gifsFood.urls, ...gifsDog.urls];

  // must be smaller than total number of gifs
  const trials = 3000;

  console.log(`Now loading ${trials} out of ${gifs.length} gifs`);

  for (i = 0; i < trials; i++) {
    if (!gifs[i]) {
      console.log('ERROR: attempting to load missing URL');
    } else {
      gifHolder.src = gifs[i];
    }
  }

  console.log('Done');

}

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  btnLoadGifs.addEventListener('click', loadGifs);

}

main();