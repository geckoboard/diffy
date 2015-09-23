var connect = require('connect');
var PORT = process.env.PORT || 5000;
var diffy = require('./diffy');
var http = require('http');
var postMessage = require('./lib/post_message');
var isWorking = false;
var app = connect()
.use(require('body-parser').urlencoded({ extended: true }))
.use(function(req, res){
  if (isWorking) {
    res.statusCode = 403;
    res.end("I'm busy working. Hold your horses!");
    return;
  }

  if (req.body.fire_and_forget) {
    res.statusCode = 202;
    res.end();
  }

  if (req.body.token && req.body.token === process.env.AUTH_TOKEN) {
    isWorking = true;

    function respond(statusCode, message) {
      res.statusCode = statusCode;
      res.end(message);
      isWorking = false;
    }

    diffy(decodeURIComponent(req.body.url), function (err, s3Url) {
      if (err) {
        respond(500, 'Something went horribly wrong: ' + err.message);
        return;
      }

      // Nothing has changed
      if (!s3Url) {
        respond(204);
        return;
      }

      // Post the message to slack
      postMessage(s3Url + '?' + Math.round(Math.random() * 1e4), function (err) {
        if (err) {
          respond(500, 'Failed to post message to Slack ' + err.message);
          return;
        }

        respond(200, s3Url);
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

http.createServer(app).listen(PORT);
