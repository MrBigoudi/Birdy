const Filter = require('bad-words');
const filter = new Filter();

class Tweet{
    static #PRIVATE_INDEX_GENERATOR = 0;

    constructor(db){
        this.db = db;
    }

    // renvoie les infos du teweet tweetid
    get(tweetid) {
        return new Promise((resolve, reject) => {
            //console.log('test get, id: ', userid);
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
            console.log('image: ', image);
            //only .gif and .png are accepted
            const regName = /^.*\.(png|gif)$/;
            if(image!=="" && !regName.test(image)){
                console.log('image resolve(false)');
                resolve(false);
            } else {
                console.log('image resolve(true)');
                resolve(true);
            }
        })
    }

    //renvoie l'id du tweet passe en parametre
    getTweetId(tweet){
        return new Promise( (resolve, reject) => {
            this.db.find(
                { 
                    index: tweet["index"],
                    author: tweet["author"],
                    content: tweet["content"],
                    image: tweet["image"],
                    nbLikes: tweet["nbLikes"],
                    nbRetweets: tweet["nbRetweets"],
                    nbComments: tweet["nbComments"],
                    comments: {},
                    dateCreated: tweet["dateCreated"] 
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
            let newTweet = {
                index: ++Tweet.#PRIVATE_INDEX_GENERATOR,
                author: author,
                content: content,
                image: image,
                nbLikes: 0,
                nbRetweets: 0,
                nbComments: 0,
                comments: 0,
                dateCreated: new Date()
            }
            this.db.insert(newTweet);

            let tweetid = await this.getTweetId(newTweet);

            if(tweetid === -1) {
                //erreur
                reject();
            } else {
                resolve(tweetid);
            }
        });
    }
}

exports.default = Tweet;