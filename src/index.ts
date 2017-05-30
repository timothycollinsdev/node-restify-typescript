import * as restify from 'restify';
import * as bunyan from 'bunyan'

var log = bunyan.createLogger({name: 'myapp', level: 'debug'});


export let api = restify.createServer({
  name: "My Rest API",
  log: log
});




restify.CORS.ALLOW_HEADERS.push('authorization');
api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.queryParser());
api.use(restify.authorizationParser());
api.use(restify.fullResponse());

api.use(restify.requestLogger({
    properties: {
        foo: 'bar',    
    },
    headers: ['myheader'],
    serializers: restify.bunyan.serializers
}));


api.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));


api.on('InternalError', (req, res, err, callback)=>{
    api.log.err(err);
    return callback();
});

api.listen(8888, function () {
  api.log.info(`INFO: My rest api is running at ${api.url}`);
});

api.get({path: '/hello', name: 'SayHello'}, function(req, res, next) {
  var caller = req.params.name || 'caller';
  req.log.debug('caller is "%s"', caller);
  throw {"Error in service":"ooo"};
  //res.send({"hello": caller});
  //return next();
});

