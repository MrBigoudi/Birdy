const express = require("express");
const User = require("./entities/users.js");

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

            // suite....
            // Vérificatin existence
            // acces bd
            // Check email address
            if(!users.checkEmailAddress(emailAddress)){
                res.status(401).json({
                    status: 401,
                    message: "Unkown email address"
                });
                return;
            }

            // Check password
            if(!users.checkPasswd(passwd)){
                res.status(401).json({
                    status: 401,
                    message: "Invalid password"
                });
                return;
            }

            // Succes
            res.status(200).json({
                status: 200,
                message: "Email address and password accepted"
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

    return api;
}

exports.default = init("ok");