const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test creation d'un utilisateur",  () => {
	it("user", (done) => {
		const request = chai.request(app.default).keepOpen();
		const user1 = {
			user_id:"1",
    		username: "pikachu",
    		fullname: "ash pikachu",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "pika@pokemon.com",
    		passwd: "1234",
			following:{},
			followers:{},
			tweets:{},
			profilePicture:"../../../birdy-client/images/icons/outline_account_circle_white_36dp_2x.png",
			dateCreated:"2022-04-02"
		}

		const user2 = {
    		username: "pikachu",
    		fullname: "ash pikachu",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "pika2@pokemon.com",
    		passwd: "1234"
		}

		const user3 = {
    		username: "pikachu1",
    		fullname: "ash pikachu",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "pika@pokemon.com",
    		passwd: "1234"
		}
		
		// Test create user
		request
			.post('/api/user/signup')
			.send(user1)
			.then( (res) => {
				res.should.have.status(201); // HTTP 201 : created
				let userId = res.body.id;
				console.log(`Retrieving user ${userId}`);
				return Promise.all([
					// Test acces user infos 
					request
						.get(`/api/user/${userId}`)
						.then( (res) => {
							res.should.have.status(200); // HTTP 200 : found
							chai.assert.deepEqual(res.body, user1);
						}),

					// Test acces user inexistant
					request
						.get('/api/user/42')
						.then( (res) => {
							res.should.have.status(404); // HTTP 404 : not found
						}),
					
					// Test unicite username
					request
						.post('/api/user/signup')
						.send(user2)
						.then( (res) => {
							res.should.have.status(409); // conflict
						}),

					// Test unicite emailaddress
					request
						.post('/api/user/signup')
						.send(user3)
						.then( (res) => {
							res.should.have.status(409); // conflict
						}),
				]);
			})
			.then( () => {
				console.log('test delete');
				// Test delete
				request
				.delete(`/api/user/1`)
				.then( () => {
					request
						.get(`/api/user/1`)
						.then( (res) => {
							res.should.have.status(404);
						});
				})
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
	});
});
