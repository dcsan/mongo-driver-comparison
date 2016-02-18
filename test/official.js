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
let AppConfig = {
    mongoUri: "mongodb://localhost:27017/mongo-drivers",
};
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        AppConfig["db"] = yield MongoClient.connect(AppConfig.mongoUri);
    });
}
function add(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let collection = db.collection("story");
        let res = (yield collection.insertOne({ test: 1 }));
        assert.equal(1, res.insertedCount);
        return res;
    });
}
function userExistsInDB(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = db.collection("users");
            let userCount = (yield collection.find({
                email: email,
                password: password
            }).limit(1).count());
            return userCount > 0;
        }
        finally {
            db.close();
        }
    });
}
function testRun() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbConnect();
        let res = yield add({});
        console.log("add", res);
    });
}
testRun();
