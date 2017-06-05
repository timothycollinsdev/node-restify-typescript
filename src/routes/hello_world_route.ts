import { Route } from '../common/route';
import {Server} from "restify";

export class HelloWorldRoute implements Route {

    private server: Server;

    constructor(server) {
        this.server = server;
    }

    public init(): void {
        
        this.server.get({ path: '/hello', name: 'SayHello' }, function (req, res, next) {
            var caller = req.params.name || 'caller';
            req.log.debug('caller is "%s"', caller);
            res.send({ "hello": caller });
            return next();
        });
        
    }

}

