/// <reference path="../typings/tsd.d.ts" />

"use strict";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

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
  AppConfig["db"] = await MongoClient.connect(AppConfig.mongoUri);
}

async function add(item) {
  let collection = db.collection("story");
  let res = (await collection.insertOne({test: 1}));
  assert.equal(1, res.insertedCount);
  // let res = await collection.insert(item);

  // var res = await db.collection("inserts").insertOne({a:1});

  return res;
}

async function userExistsInDB(email, password) {
    try {
        let collection = db.collection("users");
        let userCount = (await collection.find(
            {
                email: email,
                password: password
            }).limit(1).count());
        return userCount > 0;
    } finally {
        db.close();
    }
}

async function testRun() {
  await dbConnect();
  let res = await add({});
  console.log("add", res);
}

testRun();

// let res = await userExistsInDB("dc", "dc");
// console.log("res", res);
