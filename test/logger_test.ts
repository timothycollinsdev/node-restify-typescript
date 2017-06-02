import {instance, mock, reset, when} from 'ts-mockito';
export const expect:Chai.ExpectStatic = require('chai').expect;

import logger from '../src/common/logger'
var tsMockito = require("ts-mockito");

import * as bunyan from 'bunyan'


describe('testing for logger', () => {
    it('should reset a value configured to be returned', () => {

        expect(logger.appLog).to.not.equal(null);
        expect(logger.auditLog).to.not.equal(null);
        expect(logger.appLog.name).to.equal("myapp");

    });
});


