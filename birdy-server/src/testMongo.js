const Datastore = require('nedb');

let db = {};

db.users = new Datastore("../database/users.db");
db.tweets = new Datastore("../database/tweets.db");
db.images = new Datastore("../database/images.db");

db.users.loadDatabase();
db.tweets.loadDatabase();
db.images.loadDatabase();
