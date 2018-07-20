const { remote } = require('electron');

const allGifs = require('../../static/gifUrls/gif-all');

// creating global constants
const gifHolder = document.getElementById('gif-holder');

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  const btnDeleteSrc = document.getElementById('btn-delete-src');
  const btnRemoveImg = document.getElementById('btn-remove-img');

  btnLoadGifs.addEventListener('click', loadGifs);
  btnDeleteSrc.addEventListener('click', deleteImageSource);
  btnRemoveImg.addEventListener('click', removeImage);
}

async function loadGifs() {
  const gifs = allGifs.urls;

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
  });

  console.log('Done');

}

function deleteImageSource() {
  gifHolder.src = null;
}

function removeImage() {
  gifHolder.parentNode.removeChild(gifHolder);
}

// counts the number of unique elements in an array
function countUniqueElements(list) {
  return (new Set(list)).size;
}

main();