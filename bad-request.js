
let tags = ['ipfs'];

let url =
  'https://stackoverflow.com/feeds/tag?sort=newest&tagnames='
  + encodeURIComponent(tags.join(' or '));

function log() {
  console.log(...arguments)
}

log('feed url', url)


let request = require('request');

let req = request(url)

req.on('error', function (error) {
  log('request error', error)
});

req.on('response', function (res) {
  var stream = this;

  log('response', res.statusMessage)

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

});