const Filter = require('bad-words');
const filter = new Filter();

class User{
    static #MIN_AGE = 13;

    constructor(db){
        this.db = db;
        // suite plus tard avec la bd
    }

    //renvoie l'id de l'utilisateur ayant pour pseudo username, -1 si erreur
    getUserId(username){
        return new Promise( (resolve, reject) => {
            this.db.find({ username: username },function (err, docs) {
                if(err){
                    reject(err);
                }
                //console.log('docs in getUserId: ', docs);
                if(docs.length===1){
                    resolve(docs[0]['_id'])
                } else {
                    reject(-1);
                }
            });
        });
    }

    //renvoie true si un utilisateur exists deja
    async exists(username, emailAddress){
        //console.log('init exists');
        let usernameExists = await this.checkUsername(username);
        //console.log('usernameExists done');
        let emailAddressExists = await this.checkEmailAddress(emailAddress);
        //console.log('emailAddressExists done');

        return new Promise( (resolve, reject) => {
            const exists = usernameExists || emailAddressExists;
            //console.log('exists in exists()', exists);
            if(exists){
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    //cree un utilisateur et l'ajoute dans la db et renvoie son id
    create(username, fullname, dateOfBirth, emailAddress, passwd) {
        return new Promise(async (resolve, reject) => {            
            const exists = await this.exists(username, emailAddress);
            //console.log('exists in create()', exists);
            
            if(!exists){
                //console.log('try to insert');
                let newUser = {
                    username: username.toLowerCase(),
                    fullname: fullname.toLowerCase(),
                    dateOfBirth: new Date(dateOfBirth),
                    emailAddress: emailAddress.toLowerCase(),
                    passwd: passwd,
                    following: [],
                    followers: [],
                    tweets: [],
                    tweetsLiked: [],
                    tweetsRetweeted: [],
                    tweetsReplied: [],
                    profilePicture: "",
                    dateCreated: new Date(),
                    blockedTerms: []
                }
                this.db.insert(newUser);
            }

            let userid = await this.getUserId(username.toLowerCase());

            if(exists) {
                //erreur
                reject();
            } else {
                resolve(userid);
            }
        });
    }

    // renvoie les infos de l'utilisateur userid
    get(userid) {
        return new Promise((resolve, reject) => {
            //console.log('test get, id: ', userid);
            this.db.find({ _id: userid }, { }, function(err, docs) {
                if(err){
                    reject(err);
                }
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    resolve(null);
                }

                const user = docs[0];
                //console.log('user in get: ', user);
                if(!user) {
                    //erreur
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }

    //enleve un utilisateur de la db
    delete(userid) {
        return new Promise((resolve, reject) => {
            //console.log('test delete, id: ', userid);
            this.db.remove({ _id: userid }, {}, function(err, numRemoved) {
                if(err){
                    reject(err);
                }
                //console.log('numRemoved: ', numRemoved);
                if(numRemoved === 0){
                    reject(err);
                } else {
                    resolve(userid);
                }
            });
        });
    }

    //nettoie la database
    cleanDB(){
        return new Promise((resolve, reject) => {
            this.db.remove({}, { multi: true }, function(err, numRemoved) {
                if(err){
                    reject(err);
                } else {
                    resolve(numRemoved);
                }
            });
        });
    }

    //return true if email already exists
    checkEmailAddress(emailAddress){
        return new Promise((resolve, reject) => {
            this.db.find({ emailAddress: emailAddress.toLowerCase() },function (err, docs) {
                if(err){
                    reject(err);
                }
                const exists = (docs.length!==0);
                //console.log('exists in checkEmailAddress: ', exists);
                if(!exists) {
                    //erreur
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    //renvoie l'id de l'utilisateur de mail emailAddress et de mdp passwd
    //renvoie une erreur si le mdp ne correspond pas
    checkPasswd(emailAddress, passwd){
        return new Promise((resolve, reject) => {
            this.db.find({ emailAddress: emailAddress.toLowerCase(), passwd: passwd }, { _id: 1}, function (err, docs) {
                if(err){
                    reject(err);
                }
                if(docs.length > 1){
                    reject('too many results');
                }
                const exists = (docs.length===1);
                //console.log('exists in checkPassword: ', exists);
                if(!exists) {
                    //erreur
                    resolve(false);
                } else {
                    resolve(docs[0]['_id']);
                }
            });
        });
    }

    //renvoie true si le pseudo existe deja
    checkUsername(username){
        return new Promise((resolve, reject) => {
            this.db.find({ username: username.toLowerCase() }, function (err, docs) {
                const exists = (docs.length!==0);
                if(err){
                    reject(err);
                }
                //console.log('exists in checkUsername: ', exists);
                if(!exists) {
                    //erreur
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    //renvoie true si le pseudo n'est pas inapproprie
    validUsername(username){
        return new Promise((resolve, reject) => {
            const regName = /^[a-zA-Z0-9]+$/;
            if(!regName.test(filter.clean(username))) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    //renvoie true si le nom est valide
    checkFullName(fullname){
        return new Promise((resolve, reject) => {
            const regName = /^[a-zA-Z]+(\ *[a-zA-Z]+)*$/;
            if(!regName.test(filter.clean(fullname))) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    //renvoie true si la date est valide
    checkDateOfBirth(dateOfBirth){
        //console.log('check date of birth in users');
        return new Promise((resolve, reject) => {
            // check format
            //console.log('check format');
            const birth = new Date(dateOfBirth);
            //console.log(birth.getDate());
            let error = (birth instanceof Date && isNaN(birth.getDate()));
            if(error) {
                resolve(false);
            }

            // check value
            //console.log('check value');
            const curDate = new Date();
            let age = curDate.getFullYear() - birth.getFullYear();
            //console.log('age: ', age);
            const month = curDate.getMonth() - birth.getMonth();
            //console.log('month: ', month);
            if( month<0 || (month===0 && curDate.getDate() < birth.getDate() )){
                age--;
            }
            if(age < User.#MIN_AGE){
                resolve(false);
            }

            // ok
            resolve(true);

        });
    }

    //ajoute un tweet dans la liste des tweets d'un utilisateur
    addTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $push: { tweets: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    resolve(false);
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    //enleve un tweet dans la liste des tweets d'un utilisateur
    deleteTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $pull: { tweets: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    reject("Tweet doesn't exists");
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    //renvoie la liste des tweets d'un utilisateur
    getTweets(userid){
        return new Promise( (resolve, reject) => {
            //console.log('test get, id: ', userid);
            this.db.find({ _id: userid }, { _id: 0 }, function(err, docs) {
                if(err){
                    reject(err);
                }
                if(docs.length !== 1){
                    reject(null);
                }

                //const blockedTerms = docs[0]['blockedTerms'];
                /*
                const tweets = docs[0]['tweets'].filter((item) => {
                    for(let word of item['content']){
                        if(blockedTerms.includes(word))
                            return false;
                    }
                    return true;
                });
                */
               const tweets = docs[0]['tweets'];


                if(!tweets) {
                    //erreur
                    reject(err);
                } else {
                    resolve(tweets);
                }
            });
        });
    }

    //ajoute un tweet dans la liste des tweetLiked d'un utilisateur
    addLikedTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $push: { tweetsLiked: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    resolve(false);
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    //enleve un tweet dans la liste des tweetLiked d'un utilisateur
    removeLikedTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $pull: { tweetsLiked: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    resolve(false);
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    //ajoute un tweet dans la liste des tweetRetweeted d'un utilisateur
    addRetweetedTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $push: { tweetsRetweeted: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    resolve(false);
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    //enleve un tweet dans la liste des tweetRetweeted d'un utilisateur
    removeRetweetedTweet(userId, tweetId){
        return new Promise( (resolve, reject) => {
            this.db.update({ _id: userId }, { $pull: { tweetsRetweeted: tweetId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    resolve(false);
                } else {
                    resolve(tweetId);
                }
            });
        });
    }

    // renvoie la liste des utilisateurs dont la liste des ids est donnee en parametres
    getFollows(listIds) {
        return new Promise((resolve, reject) => {
            let followsId = listIds.map( (id) => {
                    return { _id: id }
                });

            console.log('followsId in users.js: ', followsId);
    
            this.db.find({ $or: followsId}, {multi: true}, function(err, docs){
                if(err){
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    //ajoute un utilisateur dans la liste des following d'un utilisateur
    addFollow(userId, followId){
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $push: { following: followId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                } else {
                    resolve(followId);
                }
            });
        });
    }

    //ajoute un utilisateur dans la liste des followers d'un utilisateur
    addFollower(userId, followerId){
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $push: { followers: followerId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                } else {
                    resolve(followerId);
                }
            });
        });
    }

    //renvoie true si le user userid follow deja la personne followid
    checkAlreadyFollowing(userId, followId){
        return new Promise( (resolve, reject) => {
            this.db.find({ _id: userId }, {}, function(err, docs){
                if(err){
                    reject(err);
                }
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    reject("User doesn't exists");
                }
                const following = docs[0]['following'];
                //console.log('retweeters: ', retweeters, '\nuserid: ', userid);
                if(following.includes(followId)) {
                    //erreur
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    //supprime un utilisateur de la liste des following d'un utilisateur
    deleteFollow(userId, unfollowId){
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $pull: { following: unfollowId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                } else {
                    resolve(unfollowId);
                }
            });
        });
    }

    //supprime un utilisateur de la liste des followers d'un utilisateur
    deleteFollower(userId, unfollowerId){
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $pull: { followers: unfollowerId } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                } else {
                    resolve(unfollowerId);
                }
            });
        });
    }

    /** TME Solo **/

    //ajoute un mot bloque dans la liste des mots bloques de l'utilisateur
    addBlockTerm(userId, newBlockTerm){
        return new Promise( (resolve, reject) => {
            this.db.update( {_id: userId }, { $push: { blockedTerms: newBlockTerm } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    //si le mot ne s'est pas ajoute correctement
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    //verif qu'un mot bloque existe deja
    blockTermExists(userId, newBlockTerm){
        return new Promise( (resolve, reject) => {
            this.db.find( {_id: userId }, { _id: 0 }, function(err, docs) {
                if(err){
                    reject(err);
                }
                if(docs.length !== 1){
                    reject(null);
                }

                const blockedTerms = docs[0]['blockedTerms'];

                if(!blockedTerms) {
                    //erreur
                    reject(err);
                } else {
                    resolve(blockedTerms.includes(newBlockTerm));
                }
            });
        });
    }

    //enleve un mot bloque dans la liste des mots bloques de l'utilisateur
    removeBlockTerm(userId, newBlockTerm){
        return new Promise( (resolve, reject) => {
            this.db.update( {_id: userId }, { $pull: { blockedTerms: newBlockTerm } }, {}, function (err, numReplaced) {
                if(err){
                    reject(err);
                }
                if(numReplaced === 0){
                    //si le mot ne s'est pas ajoute correctement
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

exports.default = User;