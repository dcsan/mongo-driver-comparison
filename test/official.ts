/// <reference path="../typings/tsd.d.ts" />

"use strict";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

let debugNpm = require("debug");
let debug = debugNpm('official');

let dbConn;

let AppConfig = {
  mongoUri: "mongodb://localhost:27017/mongo-drivers",
  // db: any
};


// http://stackoverflow.com/questions/33450722/check-if-document-exists-in-mongodb-using-es7-async-await

// the official 2.1 driver with ES6 support
// http://mongodb.github.io/node-mongodb-native/2.1/
//
// var MongoClient = require("mongodb").MongoClient,
//   co = require("co"),
//   assert = require("assert");
//
// co(function*() {
//   // Connection URL
//   var url = APPCONFIG.mongoUri;
//   // Use connect method to connect to the Server
//   var db = yield MongoClient.connect(url);
//   // Close the connection
//   db.close();
// }).catch(function(err) {
//   console.log(err.stack);
// });

async function dbConnect() {
  dbConn = await MongoClient.connect(AppConfig.mongoUri);
}

async function add(item) {
  debug('add');
  let collection = dbConn.collection("Stories");
  debug('coll', collection);
  let res = (await collection.insertOne(item));
  assert.equal(1, res.insertedCount);
  return res;
}

async function find(item) {
  debug('find', item);
  let collection = dbConn.collection("Stories");
  let res = (await collection.findOne(item));
  debug('res', res);
  return res;
}

// async function userExistsInDB(email, password) {
//     try {
//         let collection = db.collection("users");
//         let userCount = (await collection.find(
//             {
//                 email: email,
//                 password: password
//             }).limit(1).count());
//         return userCount > 0;
//     } finally {
//         db.close();
//     }
// }

async function testRun() {
  console.log("connecting");
  await dbConnect();
  console.log("adding");
  let res1 = await add({a:1});
  console.log("res1", res1);

  let res2 = await find({a:1});
  console.log("res2", res2);

}

testRun();

// let res = await userExistsInDB("dc", "dc");
// console.log("res", res);
