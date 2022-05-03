const express = require("express");
const Tweet = require("../entities/tweets.js");
const User = require("../entities/users.js");

function init(dbtweet, dbuser){
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

    const tweets = new Tweet.default(dbtweet);
    const users = new User.default(dbuser);


    api
        .route("/tweet/:_id")
        //get tweet service
        .get(async (req, res) => {
            //console.log('test api.get');
            try {
                //console.log('test api.get await tweet');
                //console.log('id: ', req.params._id);
                const tweet = await tweets.get(`${req.params._id}`);
                //console.log('tweet in api: ', tweet);
                if (!tweet)
                    res.status(404).send("Tweet not found");
                else
                    res.send(tweet);
            }
            catch (e) {
                res.status(500).send("Internal error");
            }
        })
        //delete tweet service
        .delete(async (req, res, next) => {
            //console.log('test api.delete');
            try{
                //console.log('test api.delete await tweet');
                //console.log('id: ', req.params._id);
                const deletedTweet = await tweets.delete(`${req.params._id}`);
                //const deleteTweetInUserDB = await users.deleteTweet(`${req.params._id}`);
                //console.log('deleted tweet: ', deletedTweet);
                res.status(200).send(`delete tweet ${req.params._id}`);
            }
            catch (e) {
                res.status(500).send("Internal error");
            }
        });

    //newTweet service
    api
        .post("/tweet/newTweet", async (req, res) => {
            try{
                const { author, content, image } = req.body;
                console.log('test missing fields');
                if (!author || (!content && !image) ) {
                    res.status(400).json({
                        status: 400,
                        message: "Missing Fields"
                    });
                    return;
                }

                console.log('test author');
                if(! await users.get(author)){
                    res.status(404).json({
                        status: 404,
                        message: "Author doesn't exist"
                    });
                    return;
                }
    
                console.log('test content');
                if(! await tweets.checkContent(content)){
                    res.status(422).json({
                        status: 422,
                        message: "Invalid message"
                    });
                    return;
                }
    
                console.log('test image');
                if(! await tweets.checkImage(image)){
                    res.status(422).json({
                        status: 422,
                        message: "Invalid image"
                    });
                    return;
                } 
                
                console.log('creation');
                tweets.create(author, content, image)
                    .then((_id) => res.status(201).json({
                        status: 201,
                        message: "New tweet registered successfully",
                        id: _id
                    }))
                    .catch((err) => res.status(500).json({
                        status: 500,
                        message: "Internal error"
                    }))
            }
            catch(e){
                // Exception
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        });


    return api;
}

exports.default = init;