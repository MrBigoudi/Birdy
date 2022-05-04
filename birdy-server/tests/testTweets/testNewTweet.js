const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test creation d'un nouveau tweet",  () => {
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
		let tweet2 = {};
		let tweet3 = {};
		let tweet4 = {};
		let tweet5 = {};
		let tweet6 = {};
		

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

				tweet2 = {
					author: "",
					content: "this is a test tweet",
					image: "image.png"
				}
		
				tweet3 = {
					author: `${userid}`,
					content: "",
					image: ""
				}

				tweet4 = {
					author: "error author doesn't exist",
					content: "this is a test tweet",
					image: "image.png"
				}

				tweet5 = {
					author: `${userid}`,
					content: "this is a fuCKing awesome message but it generates an error",
					image: "image.png"
				}

				tweet6 = {
					author: `${userid}`,
					content: "",
					image: "wrongImage.jpeg"
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
							// Test acces tweet infos 
							request
								.get(`/apiTweet/tweet/${tweetid}`)
								.then( (res) => {
									res.should.have.status(200); // HTTP 200: Ok
									//chai.assert.deepEqual(res.body, tweet1);
								}),

							// Test acces tweet inexistant
							request
								.get('/apiTweet/tweet/42')
								.then( (res) => {
									res.should.have.status(404); // HTTP 404: not found
								}),

							// Test missing author
							request
								.post('/apiTweet/tweet/newTweet')
								.send(tweet2)
								.then( (res) => {
									res.should.have.status(400); //HTTP 40O: Bad Request
								}),

							// Test missing tweet content
							request
								.post('/apiTweet/tweet/newTweet')
								.send(tweet3)
								.then( (res) => {
									res.should.have.status(400); //HTTP 40O: Bad Request
								}),

							// Test invalid author
							request
								.post('/apiTweet/tweet/newTweet')
								.send(tweet4)
								.then( (res) => {
									res.should.have.status(404); //HTTP 40O: Not Found
								}),

							// Test inappropriate message
							request
								.post('/apiTweet/tweet/newTweet')
								.send(tweet5)
								.then( (res) => {
									res.should.have.status(422); //HTTP 422: Unprocessable Entity
								}),
							
							// Test invalid image format
							request
								.post('/apiTweet/tweet/newTweet')
								.send(tweet6)
								.then( (res) => {
									res.should.have.status(422); //HTTP 422: Unprocessable Entity
								}),
						]);
					})
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
