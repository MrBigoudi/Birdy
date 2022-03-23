import * as ERROR_MSG from "../constants/errorMessages.js";

import { Tweet, tweets } from "./tweets.js";

import DEFAULT_PP from "../images/icons/outline_account_circle_white_36dp_2x.png";

//import DEFAULT_PROFILE_PICTURE from "../images/icons/navBarIcons/outline_home_white_24dp_2x.png";

export class User{
    static #PRIVATE_ID_GENERATOR = 0;
    #id = `user${++User.#PRIVATE_ID_GENERATOR}`;
    #username;
    #fullname;
    #dateOfBirth;
    #emailAddress;
    #passwd;
    #following = []; //array of user id
    #followers = []; //array of user id
    #tweets = []; //array of tweet id
    #profilePicture = DEFAULT_PP;
    #dateCreated = new Date();
    
    constructor(username, fullname, dateOfBirth, emailAddress, passwd){
        this.#username = username;
        this.#fullname = fullname;
        this.#dateOfBirth = dateOfBirth;
        this.#emailAddress = emailAddress;
        this.#passwd = passwd;   
    }

    getId(){return this.#id;}
    getUsername(){return this.#username;}
    getFullname(){return this.#fullname;}
    getDateOfBirth(){return this.#dateOfBirth;}
    getEmailAddress(){return this.#emailAddress;}
    getFollowing(){return this.#following;}
    getFollowers(){return this.#followers;}
    getTweets(){return this.#tweets;}
    getProfilePicture(){return this.#profilePicture;}
    getDateCreated(){return this.#dateCreated;}

    checkEmailAddress(emailAddress){
        return emailAddress.toLowerCase() === this.#emailAddress.toLowerCase();
    }
    checkPasswd(passwd){
        return passwd === this.#passwd;
    }
    checkUsername(username){
        return username.toLowerCase() === this.#username.toLowerCase();
    }

    createTweet(content){
        let twt = new Tweet(this, content);
        this.#tweets.unshift(twt);
        tweets.unshift(twt);//global tweet array
    }
}

/**
 * generate a random string of size n
 **/
function genRandomString(n){
    let res = "";
    for (let i=0; i<n; i++){
        const random = Math.floor(Math.random()*26);
        res += String.fromCharCode(97+random);
    }
    return res;
}

function genRandomName(){
    return genRandomString(Math.floor(Math.random()*8 + 3))//names size between 3 and 10
}

function genRandomFullName(){
    return `${genRandomName()} ${genRandomName()}`;
}

function genRandomEmailAddress(fullname){
    const domains = ["gmail", "yahoo", "hotmail"];
    const dots = ["com", "net", "fr"];
    const domain = domains[Math.floor(Math.random()*domains.length)];
    const dot = dots[Math.floor(Math.random()*dots.length)];
    const names = fullname.split(" ");
    return `${names[0]}.${names[1]}@${domain}.${dot}`;
}

function genRandomDate(start, end){
    return new Date(+start + Math.random() * (end-start)).toDateString();
}

function genRandomUser(){
    const username = genRandomName();
    const fullname = genRandomFullName();
    const dateOfBirth = genRandomDate(new Date(1900, 1), new Date(2022, 12));
    const emailAddress = genRandomEmailAddress(fullname);
    const passwd = genRandomName();

    return new User(username, fullname, dateOfBirth, emailAddress, passwd);
}

function genRandomUsers(n){
    let usersTmp = []
    for (let i=0; i<n; i++){
        usersTmp.push(genRandomUser());
    }
    return usersTmp;
}

export function checkLogin(emailAddress, passwd){
    return new Promise( (resolve, reject) => {
        let valid = true;
        let msg = "";
        let username = "";
        //console.log(users);
        for (let user of users){
            if (user.checkEmailAddress(emailAddress)){
                if(user.checkPasswd(passwd)){
                    username = user.getUsername();
                    break;
                }
                msg = ERROR_MSG.WRONG_PASSWD;
                valid = false;
                break;
            }
        }

        if(username === "" && msg === ""){
            msg = ERROR_MSG.WRONG_EMAIL;
            valid = false;
        }

        /* gestion de la promesse */
        if(valid){
            resolve(username);
        }
        else{
            reject(Error(msg));
        }
    }); 
}

export function checkAlreadyExist(username, emailAddress){
    return new Promise( (resolve, reject) => {
        let valid = true;
        let msg = "";
        //console.log(users);
        for (let user of users){
            if (user.checkEmailAddress(emailAddress)){
                msg = ERROR_MSG.EMAIL_TAKEN;
                valid = false;
                break;
            }
            if (user.checkUsername(username)){
                msg = ERROR_MSG.USERNAME_TAKEN;
                valid = false;
                break;
            }
        }

        /* gestion de la promesse */
        if(valid){
            resolve(username);
        }
        else{
            reject(Error(msg));
        }
    }); 
}

export function addUserFromSignup(formdata){
    const usr = new User(formdata.username, formdata.fullname, formdata.dateOfBirth,
        formdata.emailAddress, formdata.password);    
    addUserToDataBase(usr);
    //console.log(users);
}

function addUserToDataBase(user){
    users.push(user);
}

export const users = [
    new User("mrBigoudi", "Yannis Kedadry", "Tue May 12 2000", "yayakeda94490@gmail.com", "yep"),
    new User("karl", "Karl Hadwen", "Fri Dec 10 1965", "karlhadwen@gmail.com", "1234"),
    new User("raphael", "Raffaello Sanzio", "Fri Dec 10 1965", "raphael@sanzio.com", "0000")
];