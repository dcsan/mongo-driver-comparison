'use strict';

// http://mongodb.github.io/node-mongodb-native/2.1/reference/ecmascript6/crud/
// https://github.com/tj/co
// http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#find

var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');

let AppConfig = {};

// co(function*() {
//   // Connection URL
//   var db = yield MongoClient.connect('mongodb://localhost:27017/mongo-drivers');
//   console.log("Connected correctly to server");
//
//   // Insert a single document
//   var r = yield db.collection('inserts').insertOne({a:1});
//   assert.equal(1, r.insertedCount);
//
//   // Insert multiple documents
//   var r = yield db.collection('inserts').insertMany([{a:2}, {a:3}]);
//   assert.equal(2, r.insertedCount);
//
//   // Close connection
//   db.close();
// }).catch(function(err) {
//   console.log(err.stack);
// });

var connectDb = co.wrap(function* () {
  console.log('connecting to db');
  let db = yield MongoClient.connect('mongodb://localhost:27017/mongo-drivers');
  AppConfig.users = db.collection('users');
  AppConfig.db = db;
  console.log('connecting to db < DONE');
  return (AppConfig);
});


var addUsers = co.wrap(function* (item) {
  return yield AppConfig.users.insertOne(item);
});

let main = co.wrap(function* () {
  yield connectDb();
  let res = yield addUsers({name: 'bob'});
  console.log('users', res);
});

main();
console.log('done');
