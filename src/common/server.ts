import { ApiLogger } from './logger'
import * as restify from 'restify';

export class ConfigServer {

    public createServer(appLogger, auditLogger) : restify.Server {
        let srvr = restify.createServer({
            name: "My Rest API",
            log: appLogger
        });


        //restify.CORS.ALLOW_HEADERS.push('authorization');

        this.addMiddlewares(srvr);
        this.addAuditLogger(srvr, auditLogger);
        this.addListener(srvr);

        return srvr;
    }

    private addListener(srvr: restify.Server): void {
        srvr.listen(8888, function () {
            srvr.log.info(`INFO: My rest api is running at ${srvr.url}`);
        });
    }

    private addAuditLogger(srvr: restify.Server, auditLogger): void {
        srvr.on('after', restify.auditLogger({
            log: auditLogger
        }));
    }

    private addMiddlewares(srvr: restify.Server): void {
        srvr.use(restify.CORS());
        srvr.pre(restify.pre.sanitizePath());
        srvr.use(restify.acceptParser(srvr.acceptable));
        srvr.use(restify.bodyParser());
        srvr.use(restify.queryParser());
        srvr.use(restify.authorizationParser());
        srvr.use(restify.fullResponse());

        srvr.use(restify.requestLogger({
            properties: {
                foo: 'bar',
            },
            headers: ['myheader']
        }));

    }
}
