const { remote } = require('electron');

// returns a list of URLs to a set number of trending GIFs from Giphy
function getGifsSearch(apiKey, query, num) {
  return new Promise((resolve, reject) => {
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${num}`;
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

async function printGifs(query) {

  const apiKey = 'c7EYcZrGfteVj6mz9lQzzjUwYwmwxPE5';
  const gifCount = 1000;

  const gifs = await getGifsSearch(apiKey, query, gifCount);
  console.log(JSON.stringify(gifs));
  console.log(gifs.length);
}

module.exports.printGifs = printGifs;