const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test connection d'un utilisateur",  () => {
	it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
		let id = 0;

		const user = {
    		username: "testLogin",
    		fullname: "fulltestLogin",
    		dateOfBirth: "2000-05-12",
    		emailAddress: "testLogin@test.com",
    		passwd: "1234"
		}

        const login = {
			emailAddress: "testLogin@test.com",
			passwd: "1234"
		}

		const login2  = {
			emailAddress: "nimportequoi@gg.com",
			passwd: "1234"
		}

		const login3  = {
			passwd: "1234"
		}

		const login4 = {
			emailAddress: "testLogin@test.com",
		}

		const login5 = {
			emailAddress: "testLogin@test.com",
			passwd: "wrong passwd"
		}

		// creation utilisateur
		request
			.post('/api/user/signup')
			.send(user)
			.then( (res) => {
				//console.log('res body: ', res.body);
				id = res.body.id;
				return Promise.all([
					// Test login valid
					request
						.post('/api/user/login')
						.send(login)
						.then( (res) => {
							res.should.have.status(200); // HTTP 200: Ok
					}),

					// Test login user not existing
					request
						.post('/api/user/login')
						.send(login2)
						.then( (res) => {
							res.should.have.status(401); // HTTP 401: Unauthorized
					}),

					// Test missing email address
					request
						.post('/api/user/login')
						.send(login3)
						.then( (res) => {
							res.should.have.status(400); //HTTP 40O: Bad Request
						}),

					// Test missing passwd
					request
						.post('/api/user/login')
						.send(login4)
						.then( (res) => {
							res.should.have.status(400); //HTTP 40O: Bad Request
						}),

					// Test wrong password
					request
						.post('/api/user/login')
						.send(login5)
						.then( (res) => {
							res.should.have.status(403); // HTTP 403: Forbidden
					}),
				]);
			})
			.then( () => {
				return request
					.delete(`/api/user/logout`)
					.then( (res) => {
						res.should.have.status(200); // HTTP 200: Ok
					})
			})
			.then( () => {
				return request
					.delete(`/api/user/${id}`)
					.then( (res) => {
						res.should.have.status(200); // HTTP 200: Ok
					})
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
    });
});
    