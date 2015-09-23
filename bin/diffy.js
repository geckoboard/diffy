#!/usr/bin/env node
var diffy = require('../diffy');
var url = process.argv[2];

diffy(url, function (err, imageUrl) {
  if (err) {
    throw err;
  } else {
    console.log(imageUrl);
  }
});
