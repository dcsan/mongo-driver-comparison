"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
console.log("hello from typescript");
var pmongo = require('promised-mongo');
var db = pmongo(connectionString, [collections]);
function getQuote() {
    var quote;
    return new Promise(function (resolve, reject) {
        request("http://ron-swanson-quotes.herokuapp.com/v2/quotes", function (error, response, body) {
            quote = body;
            resolve(quote);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ron once said,");
        var quote = yield getQuote();
        console.log(quote);
    });
}
main();
