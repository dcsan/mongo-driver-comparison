/// <reference path="../typings/tsd.d.ts" />

"use strict";

// https://jaxenter.com/typescript-1-7-122642.html
// https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html

console.log("hello from typescript");

var request = require("request");

function getQuote() {
  var quote;

  return new Promise(function(resolve, reject) {
    request("http://ron-swanson-quotes.herokuapp.com/v2/quotes", function(error, response, body) {
      quote = body;

      resolve(quote);
    });
  });
}

async function main() {
	console.log("Ron once said,");
  var quote = await getQuote();
  console.log(quote);
}

main();
