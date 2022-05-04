const express = require("express");
const User = require("../entities/users.js");
const Tweet = require("../entities/tweets.js");

function init(dbusers, dbtweets){
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

    const users = new User.default(dbusers);
    const tweets = new Tweet.default(dbtweets);

    // login service
    // si on demande l'url "/user/login" on effectue la lambda
    api.post('/user/login', async (req, res) => {
        try{
            const { emailAddress, passwd } = req.body;
            // Données manquantes
            if(!emailAddress || !passwd){
                // Generation d'une erreur
                res.status(400).json({
                    status: 400,
                    message: "Invalid credentials - email address or password missing"
                });
                return;
            }

            // Check email address
            //console.log('test check email address');
            let checkEmailAddress = await users.checkEmailAddress(emailAddress);
            //console.log('checkEmailAddress in apiUser: ', checkEmailAddress);
            if(! checkEmailAddress){
                res.status(401).json({
                    status: 401,
                    message: "Unkown email address"
                });
                return;
            }

            // Check password
            let userid = await users.checkPasswd(emailAddress, passwd)
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        // Exception
                        res.status(500).json({
                            status: 500,
                            message: "Internal error"
                        });
                    }
                    else {
                        // Succes
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Email address and password accepted",
                            id: userid
                        });
                    }
                });
                return;
            }
            // Faux passwd : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "Invalid password"
            });
            return;
        }catch(e){
            // Exception
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Unknown error").toString()
            });
        }
    });

    //logout service
    api.delete('/user/logout', (req, res) => {
        if(req.session){
            req.session.destroy(err => {
                if(err){
                    res.status(400).send('Unable to logout');
                }else{
                    res.status(200).send('Logout successfully');
                }
            });
        }else{
            res.end();
        }
    });

    // likeTweet service
    api
        .route("/user/:_id/tweet/:_tweetId/like")
        .put(async (req, res) => {
            //console.log('test like tweet before try');
            try{
                //console.log('checkAlreadyLiked');
                if(await tweets.checkAlreadyLiked(`${req.params._id}`, `${req.params._tweetId}`)){
                    res.status(409).json({
                        status: 409,
                        message: "Tweet has already been liked by this user"
                    });
                    return;
                }
                
                //console.log('test like tweet');
                const likedInTweets = await tweets.likeTweet(`${req.params._id}`, `${req.params._tweetId}`);
                const likedInUsers = await users.addLikedTweet(`${req.params._id}`, `${req.params._tweetId}`);

                //console.log('checkLikedInTweets');
                if(!likedInTweets){
                    res.status(404).json({
                        status: 404,
                        message: "Tweet not found"
                    });
                    return;
                }

                //console.log('checkLikedInUsers');
                if(!likedInUsers){
                    res.status(404).json({
                        status: 404,
                        message: "Liker not found"
                    });
                    return;
                } 
                else {
                    //console.log('success?');
                    res.status(200).json({
                        status: 200,
                        message: `Tweet '${req.params._id}' liked successfully`
                    });
                    return;
                }
            } catch(e) {
                //console.log('test like tweet in catch');
                // Exception
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        });

    // unlikeTweet service
    api
        .route("/user/:_id/tweet/:_tweetId/unlike")
        .put(async (req, res) => {
            //console.log('test unlike tweet before try');
            try{
                //console.log('checkAlreadyUnliked');
                if(!await tweets.checkAlreadyLiked(`${req.params._id}`, `${req.params._tweetId}`)){
                    res.status(400).json({
                        status: 400,
                        message: "Tweet hasn't been liked by this user"
                    });
                    return;
                }
                
                //console.log('test unlike tweet');
                const unlikedInTweets = await tweets.unlikeTweet(`${req.params._id}`, `${req.params._tweetId}`);
                const unlikedInUsers = await users.removeLikedTweet(`${req.params._id}`, `${req.params._tweetId}`);

                //console.log('checkUnlikedInTweets');
                if(!unlikedInTweets){
                    res.status(404).json({
                        status: 404,
                        message: "Tweet not found"
                    });
                    return;
                }

                //console.log('checkUnlikedInUsers');
                if(!unlikedInUsers){
                    res.status(404).json({
                        status: 404,
                        message: "Unliker not found"
                    });
                    return;
                } 
                else {
                    //console.log('success?');
                    res.status(200).json({
                        status: 200,
                        message: `Tweet '${req.params._id}' unliked successfully`
                    });
                    return;
                }
            } catch(e) {
                //console.log('test unlike tweet in catch');
                // Exception
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        });

    api
        .route("/user/:_id")
        //get user service
        .get(async (req, res) => {
            //console.log('test api.get');
            try {
                //console.log('test api.get await user');
                //console.log('id: ', req.params._id);
                const user = await users.get(`${req.params._id}`);
                //console.log('user in api: ', user);
                if (!user)
                    res.status(404).send("User not found");
                else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send("Internal error");
            }
        })
        //delete user service
        .delete(async (req, res, next) => {
            //console.log('test api.delete');
            try{
                //console.log('test api.delete await user');
                //console.log('id: ', req.params._id);
                const tweetList = await users.getTweets(`${req.params._id}`);
                const deletedUser = await users.delete(`${req.params._id}`);
                //console.log('tweet list in apiUser: ', tweetList);
                const deletedTweetsInTweetDB = await tweets.deleteTweets(tweetList);
                //console.log('deleted user: ', deletedUser);
                res.status(200).send(`delete user ${req.params._id}`);
            }
            catch (e) {
                //console.log('erreur?');
                res.status(500).send("Internal error");
            }
        });


    //signup service
    api.post("/user/signup", async (req, res) => {
        try{
            const { username, fullname, dateOfBirth, emailAddress, passwd } = req.body;
            //console.log('test missing fields');
            if (!username || !fullname || !dateOfBirth || !emailAddress || !passwd) {
                res.status(400).json({
                    status: 400,
                    message: "Missing Fields"
                });
                return;
            }

            //console.log('test username');
            if(await users.checkUsername(username)){
                res.status(409).json({
                    status: 409,
                    message: "Username already exists"
                });
                return;
            }

            //console.log('test valid username');
            if(! await users.validUsername(username)){
                res.status(422).json({
                    status: 422,
                    message: "Invalid username"
                });
                return;
            }

            //console.log('test fullname');
            if(! await users.checkFullName(fullname)){
                res.status(422).json({
                    status: 422,
                    message: "Invalid name"
                });
                return;
            }
            
            //console.log('test dateofbirth');
            if(! await users.checkDateOfBirth(dateOfBirth)){
                res.status(422).json({
                    status: 422,
                    message: "Invalid date of birth"
                });
                return;
            }
            
            //console.log('test email');
            if(await users.checkEmailAddress(emailAddress)){
                res.status(409).json({
                    status: 409,
                    message: "Email address already exists"
                });
                return;
            } 
            
            //console.log('creation');
            users.create(username, fullname, dateOfBirth, emailAddress, passwd)
                .then((_id) => res.status(201).json({
                    status: 201,
                    message: "New user registered successfully",
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

    //get user id
    api.get("/user/getUserId/:username", async (req, res) => {
        try{
            //console.log('username in api getUserId: ', req.params.username);
            const userId = await users.getUserId(req.params.username);
            //console.log('userId in api getUserId: ', userId);
            res.status(200).send(userId);
        } catch(e){
            res.status(500).send("Internal error");
        }
    })

    // reTweet service
    api
        .route("/user/:_id/tweet/:_tweetId/retweet")
        .put(async (req, res) => {
            //console.log('test retweet before try');
            try{
                //console.log('checkAlreadyRetweeted');
                if(await tweets.checkAlreadyRetweeted(`${req.params._id}`, `${req.params._tweetId}`)){
                    res.status(409).json({
                        status: 409,
                        message: "Tweet has already been retweeted by this user"
                    });
                    return;
                }
                
                //console.log('test retweet tweet');
                const retweetedInTweets = await tweets.retweetTweet(`${req.params._id}`, `${req.params._tweetId}`);
                const retweetedInUsers = await users.addRetweetedTweet(`${req.params._id}`, `${req.params._tweetId}`);

                //console.log('checkRetweetedInTweets');
                if(!retweetedInTweets){
                    res.status(404).json({
                        status: 404,
                        message: "Tweet not found"
                    });
                    return;
                }

                //console.log('checkRetweetedInUsers');
                if(!retweetedInUsers){
                    res.status(404).json({
                        status: 404,
                        message: "Retweeter not found"
                    });
                    return;
                } 
                else {
                    //console.log('success?');
                    res.status(200).json({
                        status: 200,
                        message: `Tweet '${req.params._id}' retweeted successfully`
                    });
                    return;
                }
            } catch(e) {
                //console.log('test retweet tweet in catch');
                // Exception
                res.status(500).json({
                    status: 500,
                    message: "Internal error",
                    details: (e || "Unknown error").toString()
                });
            }
        });

    // unRetweetTweet service
    api
        .route("/user/:_id/tweet/:_tweetId/unretweet")
        .put(async (req, res) => {
            //console.log('test unretweet tweet before try');
            try{
                //console.log('checkAlreadyRetweeted');
                if(!await tweets.checkAlreadyRetweeted(`${req.params._id}`, `${req.params._tweetId}`)){
                    res.status(400).json({
                        status: 400,
                        message: "Tweet hasn't been retweeted by this user"
                    });
                    return;
                }
                
                //console.log('test unretweet tweet');
                const unretweetedInTweets = await tweets.unretweetTweet(`${req.params._id}`, `${req.params._tweetId}`);
                const unretweetedInUsers = await users.removeRetweetedTweet(`${req.params._id}`, `${req.params._tweetId}`);

                //console.log('checkUnretweetedInTweets');
                if(!unretweetedInTweets){
                    res.status(404).json({
                        status: 404,
                        message: "Tweet not found"
                    });
                    return;
                }

                //console.log('checkUnretweetedInUsers');
                if(!unretweetedInUsers){
                    res.status(404).json({
                        status: 404,
                        message: "Unliker not found"
                    });
                    return;
                } 
                else {
                    //console.log('success?');
                    res.status(200).json({
                        status: 200,
                        message: `Tweet '${req.params._id}' unretweeted successfully`
                    });
                    return;
                }
            } catch(e) {
                //console.log('test unretweet tweet in catch');
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