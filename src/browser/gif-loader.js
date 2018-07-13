const { remote } = require('electron');

// set constants
const apiKey = 'c7EYcZrGfteVj6mz9lQzzjUwYwmwxPE5';

function getGifsRandom(apiKey, num) {
  return new Promise((resolve, reject) => {
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${num}`;
    console.log(url);

    var request = new XMLHttpRequest();
    request.open('GET', url, true);


    request.onload = (() => {
      const data = JSON.parse(request.responseText).data;
      // console.log(request.responseText);

      const urlList = [];
      for (let key of Object.keys(data)) {
        urlList.push(data[key].images.fixed_height.url);
      }

      resolve(urlList);

    });
    request.send();
  });
}

async function loadGifs() {
  const gifHolder = document.getElementById('gif-holder');

  const gifCount = 1000;
  const gifs = await getGifsRandom(apiKey, gifCount);

  for(i = 0; i < gifCount; i++) {
    gifHolder.src = gifs[i];
  }

  console.log('Done');

}

function main() {
  const btnLoadGifs = document.getElementById('btn-load-gifs');
  btnLoadGifs.addEventListener('click', loadGifs);

}

main();