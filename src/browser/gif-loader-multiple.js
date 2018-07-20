// warning: does not check for order of operations, allowing for
// null errors

const allGifs = require('../../static/gifUrls/gif-all');

// creating global constants
const numGifs = 10;
const imageHolders = createAllImages(numGifs);

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  const btnDeleteSrc = document.getElementById('btn-delete-src');
  const btnRemoveImg = document.getElementById('btn-remove-img');

  btnLoadGifs.addEventListener('click', loadAllGifs);
  btnDeleteSrc.addEventListener('click', deleteAllSources);
  btnRemoveImg.addEventListener('click', removeAllImages);
}

// creates and passes back an array of image elements
function createAllImages(numGifs) {
  const container = document.getElementById('div-container');
  const frag = document.createDocumentFragment();

  const results = [];
  for(i = 0; i < numGifs; i++) {
    const img = document.createElement('img');
    results.push(img);
    frag.appendChild(img);
  }

  container.appendChild(frag);
  return results;
}

async function loadAllGifs() {
  const gifs = allGifs.urls;

  // must be smaller than total number of gifs
  const startIndex = 0;

  const gifsToLoad = gifs.slice(startIndex, startIndex + numGifs);
  if (gifsToLoad.length !== numGifs) {
    console.log('ERROR: invalid selection of GIFs');
  }

  console.log(`Now loading ${numGifs} out of ${gifs.length} gifs`);
  console.log(`This contains ${countUniqueElements(gifsToLoad)} unique images`);
  console.log(`There are ${countUniqueElements(gifs)} unique options in total`);

  gifsToLoad.forEach((gif, i) => {
    if (!gif) {
      console.log('ERROR: attempting to load missing URL');
    } else {
      imageHolders[i].src = gif;
    }
  });

  console.log('Done');

}

function deleteAllSources() {
  imageHolders.forEach((holder) => {
    holder.src = null;
  });
}

 function removeAllImages() {
  imageHolders.forEach((holder) => {
    holder.parentNode.removeChild(holder);
  });
 }

// counts the number of unique elements in an array
function countUniqueElements(list) {
  return (new Set(list)).size;
}

main();