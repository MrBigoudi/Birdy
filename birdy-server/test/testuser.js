const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Test de l'API user",  () => {
	it("user", (done) => {
		const request = chai.request(app.default).keepOpen();
		const user = {
			id: "0",
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
	});
});
