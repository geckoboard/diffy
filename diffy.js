var captureUrl = require('./lib/capture_url');
var uploadFile = require('./lib/upload_file');
var downloadFile = require('./lib/download_file');
var imageDiff = require('image-diff');

module.exports = function (url, callback) {
  var fileSlug = encodeURIComponent(url),
    diffFileName = fileSlug + '_diff.png',
    fileName = fileSlug + '.png',
    filePath = '/tmp/' + fileName,
    lastFilePath = '/tmp/' + fileSlug + '_last.png',
    diffFilePath = '/tmp/' + diffFileName;

  downloadFile(fileName, lastFilePath, function (err) {
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

        // Store the capture for the next comparison
        uploadFile(filePath, fileName, function (err) {
          if (err) {
            callback(err);
            return;
          }

          if (noChange) {
            callback(null);
          } else {
            // Store the diff
            uploadFile(diffFilePath, diffFileName, function (err, s3Url) {
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
  });
};
