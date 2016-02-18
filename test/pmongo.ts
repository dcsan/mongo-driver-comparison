/// <reference path="../typings/tsd.d.ts" />

"use strict";

// https://www.npmjs.com/package/promised-mongo

console.log("hello from typescript");

var pmongo = require('promised-mongo');
var db = pmongo(connectionString, [collections]);



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
