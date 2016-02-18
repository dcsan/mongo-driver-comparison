"use strict";

// http://hiddentao.github.io/robe/#oplog

// install problems
// https://github.com/Automattic/monk/issues/114

var co = require('co'),
  Robe = require('robe'),
	debug = require('debug')('robe');

co(function*() {
  // connect to db
  var db = yield Robe.connect('127.0.0.1');

  // get a collection
  var collection = db.collection('test');

  // insert a record
  yield collection.insert({
    name: 'jim',
    age: 23
  });

  // find it
  var item = yield collection.findOne({
    name: 'jim'
  });

  console.log(item instanceof Robe.Document); // true
  console.log('item', Object.keys(item)); // _id, name, age

  // update
  item.age = 54;
  yield item.save();    // internally calls collection.update(...)

  // remove
  yield item.remove();  // internally calls collection.remove(...)
})
.catch(function(err) {
  console.error(err);
});

console.log('done');
