var request = require('request');

var SLACK_HOOK_URL = 'https://slack.com/api/chat.postMessage';
var SLACK_CHANNEL = process.env.SLACK_CHANNEL;
var SLACK_TOKEN = process.env.SLACK_TOKEN;
var SLACK_USERNAME = process.env.SLACK_USERNAME;

function postMessage(text, callback) {
  var form = { channel: SLACK_CHANNEL, text: text, as_user: true, token: SLACK_TOKEN, username: SLACK_USERNAME };
  request.post(SLACK_HOOK_URL, { form: form }, function (err, res, body) {
    callback(err, body);
  });
}

module.exports = postMessage;
