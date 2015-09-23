var s3 = require('s3');
var BUCKET = process.env.S3_BUCKET;
var ACCESS_KEY = process.env.S3_ACCESS_KEY_ID;
var SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY;
var REGION = process.env.S3_REGION;

module.exports = function uploadFile(srcFileName, fileKey, callback) {
  var client = s3.createClient({
    s3Options: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY
    }
  });

  var uploader = client.uploadFile({
    localFile: srcFileName,
    s3Params: { Bucket: BUCKET, Key: fileKey }
  });

  uploader.on('error', callback);

  uploader.on('end', function() {
    callback(null, s3.getPublicUrl(BUCKET, fileKey, REGION));
  });
};
