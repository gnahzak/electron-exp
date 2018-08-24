const { remote, webFrame } = require('electron');
const webframeUtil = require('../utils/webframe-resource-reporter-util');

// warning: does not check for order of operations, allowing for
// null errors

const allGifs = require('../../static/gifUrls/gif-all');

// creating global constants
const numGifs = 20;
const imageHolders = createAllImages(numGifs);

function mainFunc() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  const btnDeleteSrc = document.getElementById('btn-delete-src');
  const btnRemoveImg = document.getElementById('btn-remove-img');
  const btnCalcSize = document.getElementById('btn-calc-size');
  const btnClearCache = document.getElementById('btn-clear-cache');

  btnLoadGifs.addEventListener('click', loadAllGifs);
  btnDeleteSrc.addEventListener('click', deleteAllSources);
  btnRemoveImg.addEventListener('click', removeAllImages);
  btnCalcSize.addEventListener('click', calcAllSizes);
  btnClearCache.addEventListener('click', async (event) => {
    await sleep(5000);
    console.log(remote.app.getAppMetrics());
    webframeUtil.clearWebframe();
    console.log(remote.app.getAppMetrics());
  });

  const btnClearWebframe = document.getElementById('btn-webframe-clear');
  btnClearWebframe.addEventListener('click', async (e) => {
    console.log(webFrame.getResourceUsage());
    // await sleep(2000);
    webFrame.clearCache();
  });

  // // manually clear webframe cache by pressing 'c' key
  // document.addEventListener('keydown', e => {
  //   if (e.key == 'c') {
  //     webframeUtil.clearWebframe();
  //   }
  // });
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

function loadAllGifs() {
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
  // console.log(webFrame.getResourceUsage());
}

function deleteAllSources() {
  imageHolders.forEach((holder) => {
    // holder.src = null;
    holder.src = '../../static/img/small.png';
  });
}

 function removeAllImages() {
  imageHolders.forEach((holder) => {
    holder.parentNode.removeChild(holder);
  });
 }

// calculates the total expected size of all images in the page
function calcAllSizes() {
  let totalSize = 0;
  let totalNaturalSize = 0;

  imageHolders.forEach((holder) => {
    totalSize += calcImageSize(holder);
    totalNaturalSize += calcImageNaturalSize(holder);
  });

  // direct calculations
  console.log(`Total image size: ${totalSize}`);
  console.log(`Total natural size: ${totalNaturalSize}`);

  // built in APIs
  // console.log(webFrame.getResourceUsage());
  console.log(process.getSystemMemoryInfo());
  console.log(process.getProcessMemoryInfo());
}

// counts the number of unique elements in an array
function countUniqueElements(list) {
  return (new Set(list)).size;
}

function calcImageSize(img) {
  return (img.width * img.height);
}

function calcImageNaturalSize(img) {
  return (img.naturalWidth * img.naturalHeight);
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

mainFunc();