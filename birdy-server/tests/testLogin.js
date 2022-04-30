const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test connection d'un utilisateur",  () => {
	it("user", (done) => {
        const request = chai.request(app.default).keepOpen();

        const login = {
			emailAddress: "test@test.com",
			passwd: "1234"
		}

		// Test login
		request
			.post('/api/user/login')
			.send(login)
			.then( (res) => {
				res.should.have.status(401);
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
    });
});
    