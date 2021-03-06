const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test creation d'un utilisateur",  () => {
	it("user", (done) => {
		let id = 0;
		const request = chai.request(app.default).keepOpen();
		const user1 = {
    		username: "pikachu",
    		fullname: "ash pikachu",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "pika@pokemon.com",
    		passwd: "1234"
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

		const user4 = {
			fullname: "user4",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user4@gmail.com",
    		passwd: "1234"
		}

		const user5 = {
			username: "user5",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user5@gmail.com",
    		passwd: "1234"
		}

		const user6 = {
			username: "user6",
			fullname: "user6",
    		emailAddress: "user6@gmail.com",
    		passwd: "1234"
		}

		const user7 = {
			username: "user7",
			fullname: "user7",
    		dateOfBirth: "2000-05-12",
    		passwd: "1234"
		}

		const user8 = {
			username: "user8",
			fullname: "user8",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user8@gmail.com"
		}

		const user9 = {
			username: "user9",
			fullname: "wrongname1",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user9@gmail.com",
			passwd: "1234"
		}

		const user10 = {
			username: "user10",
			fullname: "user10",
    		dateOfBirth: "wrong birthday",
    		emailAddress: "user10@gmail.com",
			passwd: "1234"
		}

		const user11 = {
			username: "user11",
			fullname: "user11",
    		dateOfBirth: "2021-05-12",
    		emailAddress: "user11@gmail.com",
			passwd: "1234"
		}

		const user12 = {
			username: "user12",
			fullname: "ash0le",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user12@gmail.com",
			passwd: "1234"
		}

		const user13 = {
			username: "fuk",
			fullname: "user13",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user13@gmail.com",
			passwd: "1234"
		}

		const user14 = {
			username: "wrong username",
			fullname: "user14",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "user14@gmail.com",
			passwd: "1234"
		}
		
		// Test create user
		request
			.post('/api/user/signup')
			.send(user1)
			.then( (res) => {
				res.should.have.status(201); // HTTP 201 : created
				id = res.body.id;
				console.log(`Retrieving user ${id}`);
				return Promise.all([
					// Test acces user infos 
					request
						.get(`/api/user/${id}`)
						.then( (res) => {
							res.should.have.status(200); // HTTP 200: Ok
							//chai.assert.deepEqual(res.body, user1);
						}),

					// Test acces user inexistant
					request
						.get('/api/user/42')
						.then( (res) => {
							res.should.have.status(404); // HTTP 404: not found
						}),
					
					// Test unicite username
					request
						.post('/api/user/signup')
						.send(user2)
						.then( (res) => {
							res.should.have.status(409); // HTTP 409: Conflict
						}),

					// Test unicite emailaddress
					request
						.post('/api/user/signup')
						.send(user3)
						.then( (res) => {
							res.should.have.status(409); // HTTP 409: Conflict
						}),

					// Test missing field
					// Missing username
					request
						.post('/api/user/signup')
						.send(user4)
						.then( (res) => {
							res.should.have.status(400); // HTTP 40O: Bad Request
						}),
					// Missing fullname
					request
						.post('/api/user/signup')
						.send(user5)
						.then( (res) => {
							res.should.have.status(400); // HTTP 40O: Bad Request
						}),
					// Missing date of birth
					request
						.post('/api/user/signup')
						.send(user6)
						.then( (res) => {
							res.should.have.status(400); // HTTP 40O: Bad Request
						}),
					// Missing email
					request
						.post('/api/user/signup')
						.send(user7)
						.then( (res) => {
							res.should.have.status(400); // HTTP 40O: Bad Request
						}),
					// Missing passwd
					request
						.post('/api/user/signup')
						.send(user8)
						.then( (res) => {
							res.should.have.status(400); // HTTP 40O: Bad Request
						}),

					// Test fullname mauvais format
					request
						.post('/api/user/signup')
						.send(user9)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),
					
					// Test inappropriate fullname
					request
						.post('/api/user/signup')
						.send(user12)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),

					// Test invalid date of birth
					request
						.post('/api/user/signup')
						.send(user10)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),

					// Test underaged
					request
						.post('/api/user/signup')
						.send(user11)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),

					// Test inappropriate username
					request
						.post('/api/user/signup')
						.send(user13)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),
					
					// Test username mauvais format
					request
						.post('/api/user/signup')
						.send(user14)
						.then( (res) => {
							res.should.have.status(422); // HTTP 422: Unprocessable Entity
						}),
				]);
			})
			.then( () => {
				//console.log('test delete');
				// Test delete
				return request
					.delete(`/api/user/${id}`)
			})
			.then( () => {
				return request
					.get(`/api/user/${id}`)
					.then( (res) => {
						res.should.have.status(404);
					});
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
	});
});
