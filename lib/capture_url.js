var exec = require('child_process').exec;


module.exports = function captureUrl(url, fileName, callback) {
  var cmd = [
    'phantomjs',
    __dirname + '/capture.js',
    url, fileName
  ].join(' ');
  exec(cmd, callback);
};
