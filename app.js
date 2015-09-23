var connect = require('connect');
var PORT = process.env.PORT || 5000;
var diffy = require('./diffy');
var http = require('http');
var postMessage = require('./lib/post_message');

var app = connect()
.use(require('body-parser').urlencoded({ extended: true }))
.use(function(req, res){
  if (req.body.token && req.body.token === process.env.AUTH_TOKEN) {
    diffy(decodeURIComponent(req.body.url), function (err, s3Url) {
      if (err) {
        res.statusCode = 500;
        res.end('Something went horribly wrong: ' + err.message);
        return;
      }

      // Nothing has changed
      if (!s3Url) {
        res.statusCode = 204;
        res.end();
        return;
      }

      // Post the message to slack
      postMessage(s3Url + '?' + Math.round(Math.random() * 1e4), function (err) {
        if (err) {
          res.statusCode = 500;
          res.end('Failed to post message to Slack ' + err.message);
          return;
        }

        res.statusCode = 200;
        res.end(s3Url);
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

http.createServer(app).listen(PORT);
