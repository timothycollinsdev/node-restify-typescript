import { Controller } from './../common/controller';


export class SquareController implements Controller{
    constructor(server) {
        this.init(server);
    }

    private init(server): void {
        
        server.get({ path: '/square/:number', name: 'S' }, function (req, res, next) {
            var num = req.params.number || 1;
            req.log.debug('number is "%s"', num);

            res.send({ "square": num * num });
            return next();
        });
        
    }
}
