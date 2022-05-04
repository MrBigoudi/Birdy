const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test like d'un nouveau tweet",  () => {
	it("tweet", (done) => {
        let userid = 0;
		let tweetid = 0;
		const request = chai.request(app.default).keepOpen();

		const user = {
    		username: "testTweet",
    		fullname: "fulltest",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "testTweet@test.com",
    		passwd: "1234"
		}

		let tweet1 = {};

        // creation utilisateur
		request
        .post('/api/user/signup')
        .send(user)
        .then( (res) => {
            //console.log('res body: ', res.body);
            userid = res.body.id;
            tweet1 = {
                author: `${userid}`,
                content: "this is a test tweet",
                image: ""
            }
        })
        .then( () => { 
            // Test create tweet
            return request
                .post('/apiTweet/tweet/newTweet')
                .send(tweet1)
                .then( (res) => {
                    res.should.have.status(201); // HTTP 201 : created
                    tweetid = res.body.id;
                    console.log(`Retrieving tweet ${tweetid}`);
                    return Promise.all([
                        // test like 
                        request
                            .put(`/api/user/${userid}/tweet/${tweetid}/like`)
                            .then( (res) => {
                                res.should.have.status(200);
                            }),
                    ]);
                })
        })
        .then( () => {
            return Promise.all([
                // test unicite du like
                request
                    .put(`/api/user/${userid}/tweet/${tweetid}/like`)
                    .then( (res) => {
                        res.should.have.status(409);
                    }),
            ]);
        })
        .then( () => {
            //console.log('test delete');
            // Test delete tweet
            return request
                .delete(`/apiTweet/tweet/${tweetid}`)
        })
        .then( () => {
            return request
                .get(`/apiTweet/tweet/${tweetid}`)
                .then( (res) => {
                    res.should.have.status(404);
                });
        })
        .then( () => {
            //delete temporary user
            return request
                .delete(`/api/user/${userid}`)
        })
        .then( () => done(), (err) => done(err))
        .finally(() => {
            request.close();
        });
    });
});