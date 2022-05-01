const Datastore = require('nedb');

let db = {};

db.test = new Datastore("./database/test.db");

db.test.loadDatabase();

const user1 = {
    user_id:"1",
    username: "pikachu",
    fullname: "ash pikachu",
    dateOfBirth: new Date("2000-05-12"),
    emailAddress: "pika@pokemon.com",
    passwd: "1234",
    following:{},
    followers:{},
    tweets:{},
    profilePicture:"../../../birdy-client/images/icons/outline_account_circle_white_36dp_2x.png",
    dateCreated:new Date()
}

db.test.insert(user1);

db.test.find({}, {_id : 0}, (err, docs) => {
    console.log(docs);
})

db.test.remove({}, {multi:1}, (err, nbRemoved) => {})