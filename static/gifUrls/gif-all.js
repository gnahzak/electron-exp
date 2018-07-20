// combines GIF URLs from all queries to make a master list

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

module.exports.urls = gifs;