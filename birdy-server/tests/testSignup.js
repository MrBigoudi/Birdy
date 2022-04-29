const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test creation d'un utilisateur",  () => {
	it("user", (done) => {
		const request = chai.request(app.default).keepOpen();
		const user = {
    		username: "pikachu",
    		fullname: "ash pikachu",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "pika@pokemon.com",
    		passwd: "1234",
    		following: {},
    		followers: {},
    		tweets: {},
    		profilePicture: "../../birdy-client/images/icons/outline_account_circle_white_36dp_2x.png",
    		dateCreated: "2022-04-02"
		}
		
		// Test create user
		request
			.post('/api/user/signup')
			.send(user)
			.then( (res) => {
				// res : 
				//	json : 
				//		{ id : 1 }
				res.should.have.status(201); // HTTP 201 : created
				console.log(`Retrieving user ${res.body.id}`);
				return Promise.all([
					request
						.get(`/api/user/${res.body.id}`)
						.then( (res) => {
							res.should.have.status(200); // HTTP 200 : found
							chai.assert.deepEqual(res.body, user);
						}),

					request
						.get('/api/user/42')
						.then( (res) => {
							res.should.have.status(404); // HTTP 404 : not found
						}),
				]);
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
	});
});
