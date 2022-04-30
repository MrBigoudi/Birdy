const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test connection d'un utilisateur",  () => {
	it("user", (done) => {
        const request = chai.request(app.default).keepOpen();

		const user = {
    		username: "test",
    		fullname: "fulltest",
    		dateOfBirth: "2000-07-24",
    		emailAddress: "test@test.com",
    		passwd: "1234"
		}

        const login = {
			emailAddress: "test@test.com",
			passwd: "1234"
		}

		const login2  = {
			emailAddress: "nimportequoi@gg.com",
			passwd: "ok"
		}

		const login3  = {
			passwd: "ok"
		}

		const login4 = {
			emailAddress: "nimportequoi@gg.com"
		}

		const login5 = {
			emailAddress: "test@test.com",
			passwd: "wrong passwd"
		}

		// creation utilisateur
		request
			.post('/api/user/signup')
			.send(user)
			.then( () => {
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
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
    });
});
    