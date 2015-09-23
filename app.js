var connect = require('connect');
var PORT = process.env.PORT || 5000;
var diffy = require('./diffy');
var http = require('http');

var app = connect()
.use(require('body-parser').urlencoded({ extended: true }))
.use(function(req, res){
  if (req.body.token && req.body.token === process.env.AUTH_TOKEN) {
    diffy(decodeURIComponent(req.body.url), function (err, s3Url) {
      if (err) {
        res.statusCode = 500;
        res.end('Something went horribly wrong: ' + err.message);
      } else {
        res.statusCode = s3Url ? 200 : 204;
        res.end(s3Url);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

http.createServer(app).listen(PORT);
