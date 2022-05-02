const express = require("express");
const Tweet = require("../entities/tweets.js");

function init(db){
    const api = express.Router();
    // On utilise JSON
    api.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    api.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    const tweets = new Tweet.default(db);

    return api;
}

exports.default = init;