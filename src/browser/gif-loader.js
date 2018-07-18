const { remote } = require('electron');

const gifsCat = require('../../static/gifUrls/gif-urls-cat');
const gifsComputer = require('../../static/gifUrls/gif-urls-computer');
const gifsDance = require('../../static/gifUrls/gif-urls-dance');
const gifsDog = require('../../static/gifUrls/gif-urls-dog');
const gifsFood = require('../../static/gifUrls/gif-urls-food');
const gifsGirl = require('../../static/gifUrls/gif-urls-girl');
const gifsHi = require('../../static/gifUrls/gif-urls-hi');
const gifsHug = require('../../static/gifUrls/gif-urls-hug');
const gifsMeme = require('../../static/gifUrls/gif-urls-meme');
const gifsSea = require('../../static/gifUrls/gif-urls-sea');
const gifsTree = require('../../static/gifUrls/gif-urls-tree');

async function loadGifs() {
  const gifHolder = document.getElementById('gif-holder');
  const gifs = [...gifsCat.urls,
    ...gifsComputer.urls,
    ...gifsDance.urls,
    ...gifsDog.urls,
    ...gifsFood.urls,
    ...gifsGirl.urls,
    ...gifsHi.urls,
    ...gifsHug.urls,
    ...gifsMeme.urls,
    ...gifsSea.urls,
    ...gifsTree.urls,
  ];

  // must be smaller than total number of gifs
  const startIndex = 0;
  const numGifs = 1000;

  const gifsToLoad = gifs.slice(startIndex, startIndex + numGifs);
  if (gifsToLoad.length !== numGifs) {
    console.log('ERROR: invalid selection of GIFs');
  }

  console.log(`Now loading ${numGifs} out of ${gifs.length} gifs`);
  console.log(`This contains ${countUniqueElements(gifsToLoad)} unique images`);
  console.log(`There are ${countUniqueElements(gifs)} unique options in total`);

  gifsToLoad.forEach((gif) => {
    if (!gif) {
      console.log('ERROR: attempting to load missing URL');
    } else {
      gifHolder.src = gif;
    }
  })

  console.log('Done');

}

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  btnLoadGifs.addEventListener('click', loadGifs);

}

// counts the number of unique elements in an array
function countUniqueElements(list) {
  return (new Set(list)).size;
}

main();