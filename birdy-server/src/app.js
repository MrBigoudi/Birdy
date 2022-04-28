const path = require("path");
const api = require("./api.js");

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


app.use('/api', api.default);

// Démarrage du serveur
app.on('close', () => {
    //db.close
});

exports.default = app;