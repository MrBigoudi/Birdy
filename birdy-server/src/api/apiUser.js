const express = require("express");
const User = require("../entities/users.js");

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

    const users = new User.default(db);

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
                        message: "Email address and password accepted"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
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
        .route("/user/:user_id(\\d+)")
        //get user service
        .get(async (req, res) => {
            //console.log('test api.get');
            try {
                //console.log('test api.get await user');
                //console.log('id: ', req.params.user_id);
                const user = await users.get(`${req.params.user_id}`);
                //console.log('user in api: ', user);
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        //delete user service
        .delete(async (req, res, next) => {
            //console.log('test api.delete');
            try{
                //console.log('test api.delete await user');
                //console.log('id: ', req.params.user_id);
                const deletedUser = await users.delete(`${req.params.user_id}`);
                //console.log('deleted user: ', deletedUser);
                res.send(`delete user ${req.params.user_id}`);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

    //signup service
    api.post("/user/signup", async (req, res) => {
        try{
            const { username, fullname, dateOfBirth, emailAddress, passwd } = req.body;
            if (!username || !fullname || !dateOfBirth || !emailAddress || !passwd) {
                res.status(400).json({
                    status: 400,
                    message: "Missing Fields"
                });
                return;
            }if(await users.checkUsername(username)){
                res.status(409).json({
                    status: 409,
                    message: "Username already exists"
                });
                return;
            }if(! await users.checkFullName(fullname)){
                res.status(422).json({
                    status: 422,
                    message: "Invalid name"
                });
                return;
            }if(! await users.checkDateOfBirth(dateOfBirth)){
                res.status(422).json({
                    status: 422,
                    message: "Invalid date of birth"
                });
                return;
            }if(await users.checkEmailAddress(emailAddress)){
                res.status(409).json({
                    status: 409,
                    message: "Email address already exists"
                });
                return;
            } else {
                users.create(username, fullname, dateOfBirth, emailAddress, passwd)
                    .then((user_id) => res.status(201).json({
                        status: 201,
                        message: "New user registered successfully",
                        id: user_id
                    }))
                    .catch((err) => res.status(500).json({
                        status: 500,
                        message: "Internal error"
                    }))
            }
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