"use strict";

// http://mongorito.com/guides/getting-started/

let co = require('co');
let debug = require('debug')('Story');
var Mongorito = require('mongorito');
var Model = Mongorito.Model;

var Story = Model.extend({
    collection: 'story'
});

let story = new Story({
    cname: 'picnic',
    code: 'some code goes here'
});


// var all = yield(Story.all());


// let Stories = {};
// var slack = require('../controllers/botkit');
//
Story.init = function() {
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

//
//     let story = {cname: 'bob', code: 'some stuff here'};
//
//     slack.controller.storage.stories.save(story, function(err, id) {
//         if (err) {
//             console.error('saving Story: ', story);
//             slack.controller.trigger('error', [err]);
//         }
//     });
};

Story.init();

// module.exports = Story;
