var captureUrl = require('./lib/capture_url');
var uploadFile = require('./lib/upload_file');
var imageDiff = require('image-diff');
var fs = require('fs');

module.exports = function (url, callback) {
  var fileName = encodeURIComponent(url),
    filePath = '/tmp/' + fileName + '.png',
    lastFilePath = '/tmp/' + fileName + '_last.png',
    diffFilePath = '/tmp/' + fileName + '_diff.png';

  fs.stat(filePath, function(err, stats) {
    if (!err && stats.isFile()) {
      fs.renameSync(filePath, lastFilePath);
    }

    captureUrl(url, filePath, function (err) {
      if (err) {
        callback(err);
        return;
      }

      imageDiff({
        expectedImage: lastFilePath,
        actualImage: filePath,
        diffImage: diffFilePath,
        shadow: true
      }, function (err, noChange) {
        if (err) {
          callback(err);
          return;
        }

        if (noChange) {
          callback(null);
        } else {
          uploadFile(diffFilePath, fileName, function (err, s3Url) {
            if (err) {
              callback(err);
              return;
            }

            callback(null, s3Url);
          });
        }
      });
    });
  });
};
