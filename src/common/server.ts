import logger from './logger'
import * as restify from 'restify';

class Server {
    public server: restify.Server;
    constructor() {
        this.init();
    }
    private init() {
        let srvr = restify.createServer({
            name: "My Rest API",
            log: logger.appLog
        });


        //restify.CORS.ALLOW_HEADERS.push('authorization');

        this.addMiddlewares(srvr);
        this.addAuditLogger(srvr);
        this.addListener(srvr);

        this.server = srvr;
    }

    private addListener(srvr): void {
        srvr.listen(8888, function () {
            srvr.log.info(`INFO: My rest api is running at ${srvr.url}`);
        });
    }

    private addAuditLogger(srvr): void {
        srvr.on('after', restify.auditLogger({
            log: logger.auditLog
        }));
    }

    private addMiddlewares(srvr): void {
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

export default new Server().server;