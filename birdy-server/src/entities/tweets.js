const Filter = require('bad-words');
const filter = new Filter();

class Tweet{
    //static #PRIVATE_INDEX_GENERATOR = 0;

    constructor(db){
        this.db = db;
    }

    genIndex(date){
        return date.getTime();
    }

    // renvoie les infos du teweet tweetid
    get(tweetid) {
        return new Promise((resolve, reject) => {
            //console.log('test get, id: ', tweetid);
            this.db.find({ _id: tweetid }, { _id: 0 }, function(err, docs) {
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    resolve(null);
                }

                const tweet = docs[0];
                //console.log('tweet in get: ', tweet);
                if(!tweet) {
                    //erreur
                    reject(err);
                } else {
                    resolve(tweet);
                }
            });
        });
    }

    //enleve un tweet de la db
    delete(tweetid) {
        return new Promise((resolve, reject) => {
            //console.log('test delete, id: ', tweetid);
            this.db.remove({ _id: tweetid }, {}, function(err, numRemoved) {
                //console.log('numRemoved: ', numRemoved);
                if(numRemoved === 0){
                    reject(err);
                } else {
                    resolve(tweetid);
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

    //renvoie true si le contenu est valide
    checkContent(content){
        return new Promise((resolve, reject) => {
            if(content!=='' && content !== filter.clean(content)) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    //renvoie true si l'image est au bon format
    checkImage(image){
        return new Promise((resolve, reject) => {
            //console.log('image: ', image);
            //only .gif and .png are accepted
            const regName = /^blob:http(s)?:\/\/(.*)\/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/;
            if(image!=="" && !regName.test(image)){
                //console.log('image resolve(false)');
                resolve(false);
            } else {
                //console.log('image resolve(true)');
                resolve(true);
            }
        })
    }

    //renvoie l'id du tweet passe en parametre
    getTweetId(tweet){
        return new Promise( (resolve, reject) => {
            //console.log('tweet in getTweetId: ', tweet);
            this.db.find(
                { 
                    index: tweet["index"],
                    author: tweet["author"],
                    content: tweet["content"],
                    image: tweet["image"]
                },function (err, docs) {
                    //console.log('docs in getTweetId: ', docs);
                    if(docs.length===1){
                        resolve(docs[0]['_id'])
                    } else {
                        reject(-1);
                    }
                }
            );
        });
    }

    //cree un tweet et l'ajoute dans la db et renvoie son id
    create(author, content, image) {
        return new Promise(async (resolve, reject) => {
            const dateCreated = new Date();
            let newTweet = {
                index: this.genIndex(dateCreated),
                author: author,
                content: content,
                image: image,
                nbLikes: 0,
                likers: [], //pour assurer un like max par utilisateurs
                nbRetweets: 0,
                retweeters: [], //pour assurer un retweet max par utilisateurs
                nbComments: 0,
                comments: [],
                dateCreated: dateCreated
            }
            this.db.insert(newTweet);

            let tweetid = await this.getTweetId(newTweet);

            if(tweetid === -1) {
                //erreur
                reject();
            } else {
                //console.log('tweetid: ', tweetid);
                resolve(tweetid);
            }
        });
    }

    // renvoie l'auteur du teweet tweetid
    getAuthor(tweetid) {
        return new Promise((resolve, reject) => {
            //console.log('test get, id: ', tweetid);
            this.db.find({ _id: tweetid }, { _id: 0 }, function(err, docs) {
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    reject("Tweet doesn't exists");
                }

                const author = docs[0]['author'];
                //console.log('author in getAuthor: ', author);
                if(!author) {
                    //erreur
                    reject(err);
                } else {
                    resolve(author);
                }
            });
        });
    }

    // supprime tous les tweets d'une liste donnee de la db
    deleteTweets(tweetsList){
        return new Promise( (resolve, reject) => {
            //console.log('tweetsList: ', tweetsList);
            let tweetIdList = [];
            for(let tweetid of tweetsList){
                tweetIdList.push({ _id: tweetid });
            }
            //console.log('tweetIdList: ', tweetIdList);
            this.db.remove( { $or: tweetIdList }, { multi: true }, function(err, numRemoved) {
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    // renvoie true si un utilisateur a deja like un tweet
    checkAlreadyLiked(userid, tweetid) {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: tweetid }, { _id: 0 }, function(err, docs) {
                if(err){
                    reject(err);
                }
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    reject("Tweet doesn't exists");
                }
                const likers = docs[0]['likers'];
                //console.log('likers: ', likers, '\nuserid: ', userid);
                if(likers.includes(userid)) {
                    //erreur
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    // renvoie true si un utilisateur a deja retweet un tweet
    checkAlreadyRetweeted(userid, tweetid) {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: tweetid }, { _id: 0 }, function(err, docs) {
                if(err){
                    reject(err);
                }
                //console.log('docs in get: ', docs);
                if(docs.length !== 1){
                    reject("Tweet doesn't exists");
                }
                const retweeters = docs[0]['retweeters'];
                //console.log('retweeters: ', retweeters, '\nuserid: ', userid);
                if(retweeters.includes(userid)) {
                    //erreur
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }


    // incrmente le compteur de like d'un tweet
    likeTweet(userid, tweetid){
        return new Promise( (resolve, reject) => {
            this.db.update( { _id: tweetid }, { $inc: { nbLikes: 1 },  $push: { likers: userid } }, function(err, numReplaced){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    // decremente le compteur de like d'un tweet
    unlikeTweet(userid, tweetid){
        return new Promise( (resolve, reject) => {
            this.db.update( { _id: tweetid }, { $inc: { nbLikes: -1 },  $pull: { likers: userid } }, function(err, numReplaced){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    // incrmente le compteur de retweet d'un tweet
    retweetTweet(userid, tweetid){
        return new Promise( (resolve, reject) => {
            this.db.update( { _id: tweetid }, { $inc: { nbRetweets: 1 },  $push: { retweeters: userid } }, function(err, numReplaced){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    // decremente le compteur de retweet d'un tweet
    unretweetTweet(userid, tweetid){
        return new Promise( (resolve, reject) => {
            this.db.update( { _id: tweetid }, { $inc: { nbRetweets: -1 },  $pull: { retweeters: userid } }, function(err, numReplaced){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    // renvoie une liste de n tweets les plus recents
    getNTweets(n) {
        return new Promise((resolve, reject) => {
            //console.log('test get, id: ', tweetid);
            this.db.find({}, ).sort({ dateCreated: -1 }).limit(n).exec(function(err, docs) {
                //console.log('docs in getNTweets: ', docs);
                if(err) {
                    //erreur
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    // renvoie une liste de n tweets les plus recents de l'utilisateur passe en parametres
    getNTweetsFromUser(n, authorId) {
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorId }, ).sort({ dateCreated: -1 }).limit(n).exec(function(err, docs) {
                if(err) {
                    //erreur
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}

exports.default = Tweet;