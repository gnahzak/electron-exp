
const { webFrame } = require('electron');

// globals
const unitsize = 1048576;

function reportImageSize() {

  const resources = webFrame.getResourceUsage();
  const imageLivesize = resources.images.liveSize / unitsize;
  const imageSize = resources.images.size / unitsize;

  return {
    liveSize: imageLivesize,
    size: imageSize,
  };
}

function clearWebframe() {
  console.log(reportImageSize());
  webFrame.clearCache();
  console.log(reportImageSize());
  console.log('webframe cleared');
}

module.exports.clearWebframe = clearWebframe;