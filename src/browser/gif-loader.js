const { remote, webFrame } = require('electron');

const allGifs = require('../../static/gifUrls/gif-all');

// creating global constants
const gifHolder = document.getElementById('gif-holder');
const gifIndex = document.getElementById('text-gif-index');

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  const btnDeleteSrc = document.getElementById('btn-delete-src');
  const btnRemoveImg = document.getElementById('btn-remove-img');

  btnLoadGifs.addEventListener('click', loadGifs);
  btnDeleteSrc.addEventListener('click', deleteImageSource);
  btnRemoveImg.addEventListener('click', removeImage);

  const btnClearWebframe = document.getElementById('btn-webframe-clear');
  btnClearWebframe.addEventListener('click', async (e) => {
    console.log(webFrame.getResourceUsage());
    // await sleep(2000);
    webFrame.clearCache();
  });
}

async function loadGifs() {
  const gifs = allGifs.urls;

  // must be smaller than total number of gifs
  const startIndex = 0;
  const numGifs = 500;

  const gifsToLoad = gifs.slice(startIndex, startIndex + numGifs);
  if (gifsToLoad.length !== numGifs) {
    console.log('ERROR: invalid selection of GIFs');
  }

  console.log(`Now loading ${numGifs} out of ${gifs.length} gifs`);
  console.log(`This contains ${countUniqueElements(gifsToLoad)} unique images`);
  console.log(`There are ${countUniqueElements(gifs)} unique options in total`);

  // gifsToLoad.forEach(async (gif) => {
  //   if (!gif) {
  //     console.log('ERROR: attempting to load missing URL');
  //   } else {
  //     gifHolder.src = gif;
  //     await sleep(1000);
  //     console.log('finished sleeping');
  //   }
  // });

  i = 0;
  while (i < numGifs) {
    gifHolder.src = gifsToLoad[i];
    await sleep(100);
    // console.log(`finished sleeping ${i}`);
    i++;

    if (i % 100 === 0) {
      gifIndex.innerHTML = `Just loaded: ${i}`;
    }
  }

  // use to get the 500 meg gif
  // gifHolder.src = 'https://s-media-cache-ak0.pinimg.com/originals/8a/e5/c8/8ae5c8b253ce37b9876ce464e0d396c4.gif?ref=webdesignernews.com';

  console.log('Done');
  console.log(webFrame.getResourceUsage());

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

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

main();