var page = require('webpage').create();
var system = require('system');
var args = system.args;
var url = args[1];
var imagePath = args[2];
var attempt = 0;

function widgetsReady() {
  return document.querySelector('.widget') !== null && document.querySelectorAll('.widget.loading').length === 0;
}

function loop() {
  if (attempt >= 10000) {
    console.error('Took too long to open page');
    phantom.exit(1);
  }

  var ready = page.evaluate(widgetsReady);
  if (ready) {
    // Give things a second to settle down
    setTimeout(function () {
      page.render(imagePath);
      phantom.exit(0);
    }, 2e3)
  } else {
    attempt++;
    setTimeout(loop, 10);
  }
}

page.open(url, loop);
