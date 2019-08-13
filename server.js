

let feedURL =
  'https://www.google.com';
  //https://stackoverflow.com/feeds/tag?sort=newest&tagnames='
  //+ encodeURIComponent(options.tags.join(' or '));

function log() {
  console.log(...arguments)
}

log('feed url', feedURL)


function parseFeed(url) {
  let request = require('request');

  let req = request(url)

  req.on('error', function (error) {
    // handle any request errors
    log('request error', error)
  });

  req.on('response', function (res) {
    var stream = this;

    log('response', res.statusMessage)

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  });

}
