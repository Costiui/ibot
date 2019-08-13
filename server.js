

let feedURL =
  'https://metafluff.com/rss/index.xml';
  //https://stackoverflow.com/feeds/tag?sort=newest&tagnames='
  //+ encodeURIComponent(options.tags.join(' or '));

function log() {
  if (options.debug)
    console.log(...arguments)
}

log('feed url', feedURL)



function parseFeed(url) {
  var FeedParser = require('feedparser')
    , request = require('request');

  var req = request(url)
    , feedparser = new FeedParser();

  req.on('error', function (error) {
    // handle any request errors
    log('feedparser: request error', error)
  });

  req.on('response', function (res) {
    var stream = this;

    log('feedparser: response', res.statusMessage)

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    // handle any feedparser errors
    log('feedparser error', error)
  });

  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
      , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
      , item;

    while (item = stream.read()) {
      log(item.title)
    }
  });
}
