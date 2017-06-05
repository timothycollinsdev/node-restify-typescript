import {ApiLogger} from '../../src/common/logger';
import { expect, assert } from 'chai';
import * as proxyquire from 'proxyquire';

describe('Api Logger tests', () =>{
    let logger: ApiLogger;

    before(()=>{
        let bnProxy = {
            'createLogger': (loggingOptins) => {
                return null;
            }
        };
        let bunyanProxy =proxyquire('../../src/common/logger', {'bunyan': bnProxy});
        logger = new bunyanProxy.ApiLogger();

    });

    it('should create app and audit logger', ()=>{
        let loggerDetails = logger.createLogger();
        assert.isNotNull(loggerDetails);
        assert.isNull(loggerDetails.get(ApiLogger.apiLoggerName));
        assert.isNull(loggerDetails.get(ApiLogger.auditLoggerName));

    });
});