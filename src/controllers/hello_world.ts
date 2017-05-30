import { Controller } from './../common/controller'; 

export class HelloWorldController implements Controller {
 
    constructor(server) {
        this.init(server);
    }

    private init(server): void {
        
        server.get({ path: '/hello', name: 'SayHello' }, function (req, res, next) {
            var caller = req.params.name || 'caller';
            req.log.debug('caller is "%s"', caller);
            res.send({ "hello": caller });
            return next();
        });
        
    }

}

