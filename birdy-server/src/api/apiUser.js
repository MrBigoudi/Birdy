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

    return api;
}

exports.default = init;