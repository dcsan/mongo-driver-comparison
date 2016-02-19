"use strict";

// http://mongorito.com/guides/getting-started/

let co = require('co');
let debug = require('debug')('Story');
var Mongorito = require('mongorito');
Mongorito.connect('localhost/mongorito');


var Model = Mongorito.Model;

var Story = Model.extend({
    collection: 'story'
});

let story = new Story({
    cname: 'picnic',
    code: 'some code goes here'
});

let test1 = function() {
    console.log('stories.init');

    co(function*() {
      debug('before save', story);
      yield story.save();
      debug('after save', story);
    })
      .catch(function(err) {
        console.error(err);
    });

    debug('Story.init done');
};

let test2 = function() {
    story.save().then( () => {
        console.log('story saved');
    });
};

test1();
test2();
