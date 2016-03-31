"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
let debugNpm = require("debug");
let debug = debugNpm('official');
let dbConn;
let AppConfig = {
    mongoUri: "mongodb://localhost:27017/mongo-drivers",
};
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        dbConn = yield MongoClient.connect(AppConfig.mongoUri);
    });
}
function add(item) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('add');
        let collection = dbConn.collection("Stories");
        debug('coll', collection);
        let res = (yield collection.insertOne(item));
        assert.equal(1, res.insertedCount);
        return res;
    });
}
function find(item) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('find', item);
        let collection = dbConn.collection("Stories");
        let res = (yield collection.findOne(item));
        debug('res', res);
        return res;
    });
}
function testRun() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("connecting");
        yield dbConnect();
        console.log("adding");
        let res1 = yield add({ a: 1 });
        console.log("res1", res1);
        let res2 = yield find({ a: 1 });
        console.log("res2", res2);
    });
}
testRun();
