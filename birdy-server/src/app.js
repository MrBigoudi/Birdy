const path = require("path");
const apiUser = require("./api/apiUser.js");
const Datastore = require('nedb');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express();

// Session
const session = require('express-session');
app.use(session({
    secret: "technoweb rocks"
}));

let db = {};
db.users = new Datastore("./database/users.db");
db.users.loadDatabase();

app.use('/api', apiUser.default(db.users));

// Démarrage du serveur
app.on('close', () => {
    //db.close
});

exports.default = app;