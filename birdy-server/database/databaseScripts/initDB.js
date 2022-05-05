const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

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
    return genRandomString(Math.floor(Math.random()*11 + 4))//names size between 4 and 20
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

function genRandomDate(){
    const start = new Date(1950, 1);
    const end = new Date(2000, 12)
    return new Date(+start + Math.random() * (end-start));
}

function genUser(){
    const username = genRandomName();
    const fullname = genRandomFullName();
    const dateOfBirth = genRandomDate();
    const emailAddress = genRandomEmailAddress(fullname);
    const passwd = genRandomName();

    return {
        username:username,
        fullname:fullname,
        dateOfBirth:dateOfBirth,
        emailAddress:emailAddress,
        passwd:passwd
    };
}

const EASY_USER = {
    username: "q",
    fullname: "q",
    dateOfBirth: "2000-05-12",
    emailAddress: "q@q.q",
    passwd: "q"
}

function getRandomIdAuthor(usersId){
    return usersId[Math.floor(Math.random()*usersId.length)];
}

function genTweet(idAuthor, index){
    return {
        author: `${idAuthor}`,
        content: `test tweet ${index}`,
        image: ""
    }
}

const NUMBER_USERS = 20;
const NUMBER_TWEETS = 30;

describe("Init des databases",  () => {
	it("initDB", (done) => {
        const request = chai.request(app.default).keepOpen();

        let easyUserId = 0;
        let usersId = [];
        let promisesUserCreate = [];
        let tweetsId = [];
        let promisesTweetCreate = [];

        for(let i=0; i<NUMBER_USERS; i++){
            let user = genUser();
            promisesUserCreate.push(
                request
                    .post('/api/user/signup')
                    .send(user)
                    .then( (res) => { 
                        res.should.have.status(201); // HTTP 201 : created
				        usersId.push(res.body.id);
                    })
            )
        }

        request
            .post('/api/user/signup')
            .send(EASY_USER)
            .then( (res) => { 
                res.should.have.status(201); // HTTP 201 : created
                easyUserId = res.body.id;
                return Promise.all(promisesUserCreate)
            })
            .then( () => {
                console.log('usersID: ', usersId);

                for(let i=0; i<NUMBER_TWEETS; i++){
                    let tweet = genTweet(getRandomIdAuthor(usersId), i);
                    promisesTweetCreate.push(
                        request
                            .post('/apiTweet/tweet/newTweet')
                            .send(tweet)
                            .then( (res) => { 
                                res.should.have.status(201); // HTTP 201 : created
                                tweetsId.push(res.body.id);
                            })
                    )
                }
                return Promise.all(promisesUserCreate);
            })
            .then( () => {
                console.log('tweetsID: ', tweetsId);

                const easyUserTweet = {
                    author: `${easyUserId}`,
                    content: "test www.google.com test",
                    image: ""
                }

                return request
                    .post('/apiTweet/tweet/newTweet')
                    .send(easyUserTweet)
                    .then( (res) => { 
                        res.should.have.status(201); // HTTP 201 : created
                    });
            })
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
		});
});