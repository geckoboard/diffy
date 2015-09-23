var s3 = require('s3');
var fs = require('fs');
var request = require('request');
var BUCKET = process.env.S3_BUCKET;
var ACCESS_KEY = process.env.S3_ACCESS_KEY_ID;
var SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY;
var REGION = process.env.S3_REGION;

module.exports = function downloadFile(fileKey, targetFileName, callback) {
  var fileUrl = s3.getPublicUrl(BUCKET, fileKey, REGION);
  request(fileUrl).pipe(fs.createWriteStream(targetFileName)).on('finish', function (err) {
    callback(err, targetFileName);
  });
};
