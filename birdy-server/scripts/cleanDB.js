const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //app express

// Configurer chai
chai.use(chaiHttp);
chai.should();

describe("Clean des databases",  () => {
	it("cleanDB", (done) => {
		const request = chai.request(app.default).keepOpen();		
		request
            //suppression db user 
			.delete('/api/user/clean/')
			.then( (res) => {
                res.should.have.status(200); // HTTP 200 : ok
                console.log(res.text);
                return request
                    //suppression db tweet 
                    .delete('/apiTweet/tweet/clean/')
                    .then( (res) => {
                        res.should.have.status(200); // HTTP 200 : ok
                        console.log(res.text);
                    });
			})
			.then( () => done(), (err) => done(err))
			.finally(() => {
				request.close();
			});
		});
});
