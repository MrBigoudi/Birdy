const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test acces a une liste de tweets",  () => {
	it("tweet", (done) => {
		let userid = 0;
		let tweetid = [0,0,0];
		const request = chai.request(app.default).keepOpen();

		const user = {
    		username: "testTweet",
    		fullname: "fulltest",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "testTweet@test.com",
    		passwd: "1234"
		}

		let tweet1 = {};
		let tweet2 = {};
		let tweet3 = {};
		

		// creation utilisateur
		request
			.post('/api/user/signup')
			.send(user)
			.then( (res) => {
				//console.log('res body: ', res.body);
				userid = res.body.id;
				tweet1 = {
					author: `${userid}`,
					content: "1",
					image: ""
				}

				tweet2 = {
					author: `${userid}`,
					content: "2",
					image: ""
				}

				tweet3 = {
					author: `${userid}`,
					content: "3",
					image: ""
				}
			})
			.then( () => { 
				// Test create tweet
				return Promise.all([
					// Creation de 3 tweets pour l'utilisateur
					request
						.post('/apiTweet/tweet/newTweet')
						.send(tweet1)
						.then( (res) => {
							tweetid[0] = res.body.id;
							res.should.have.status(201); // HTTP 201 : created
						}),
					request
						.post('/apiTweet/tweet/newTweet')
						.send(tweet2)
						.then( (res) => {
							tweetid[1] = res.body.id;
							res.should.have.status(201); // HTTP 201 : created
						}),
					request
						.post('/apiTweet/tweet/newTweet')
						.send(tweet3)
						.then( (res) => {
							tweetid[2] = res.body.id;
							res.should.have.status(201); // HTTP 201 : created
						}),
				]);
			})
			.then( () => {
				//console.log('test get');
				// Test get list tweets tweet
				return request
					.get(`/apiTweet/tweet/getNTweets/2`)
					.then( (res) => {
						res.should.have.status(200); // HTTP 200 : ok
						chai.assert.equal(res.body.length,2);
						console.log('res n tweets: ', res.body);
					})
			})
			.then( () => {
				//delete temporary user
				return request
					.delete(`/api/user/${userid}`)
			})
			.then( () => {
				// all tweets should be deleted
				return Promise.all([
					request
						.get(`/apiTweet/tweet/${tweetid[0]}`)
						.then( (res) => {
							res.should.have.status(404);
						}),
					request
						.get(`/apiTweet/tweet/${tweetid[1]}`)
						.then( (res) => {
							res.should.have.status(404);
						}),
					request
						.get(`/apiTweet/tweet/${tweetid[2]}`)
						.then( (res) => {
							res.should.have.status(404);
						}),
				]);
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
		});
})
