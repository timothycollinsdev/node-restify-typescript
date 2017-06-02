import { expect } from 'chai';
import * as mocha from 'mocha';


var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();


chai.use(chaiHttp);


/*
 * Test the /hello route
 */
describe('/GET Hello', () => {

    it('it should say hello', (done) => {

    chai.request("http://localhost:8888")
        .get('/hello?name=sara')
        .end((err, res) => {
        res.should.have.status(200);
    res.body.should.to.be.an('object');
    JSON.stringify(res.body).should.equal('{"hello":"sara"}');
    done();
    });
 });
});