import hello from '../src/common/hello';
import { expect } from 'chai';
import * as mocha from 'mocha';

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = hello();
        expect(result).to.equal('Hello World!');
    });
});