import { User, users } from "./users.js";

import * as DATE from "../constants/date.js";

export class Tweet{
    static #PRIVATE_ID_GENERATOR = 0;
    #id = `tweet${++Tweet.#PRIVATE_ID_GENERATOR}`;
    #author; //a user
    #content;
    #comments = []; //array of tweet id
    #nbReplies = 0;
    #nbRetweets = 0;
    #nbLikes = 0
    #creationDate = new Date();
    
    constructor(author, content){
        this.#author = author;
        this.#content = content;  
    }

    getId(){return this.#id;}
    getAuthor(){return this.#author;}
    getContent(){return this.#content;}
    getComments(){return this.#comments;}
    getNbReplies(){return this.#nbReplies;}
    getNbRetweets(){return this.#nbRetweets;}
    getNbLikes(){return this.#nbLikes;}
    getCreationDate(){
        let month = DATE.MONTHS[this.#creationDate.getMonth()];
        let day = this.#creationDate.getDay();
        return `${month} ${day}`;
    }

    addLike(){this.#nbLikes++;}
    addRetweet(){this.#nbRetweets++;}
    addReply(){this.#nbReplies++;}

    removeLike(){this.#nbLikes--;}
    removeRetweet(){this.#nbRetweets--;}
    removeReply(){this.#nbReplies--;}

}

export const tweets = [];

//temporary
for (let i=0; i<20; i++){    
    const usr = Math.floor(Math.random()*users.length);
    users[usr].createTweet(`test tweet ${i}`);
}

users[0].createTweet("test www.google.com test");