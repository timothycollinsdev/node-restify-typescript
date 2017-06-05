import { Server } from 'restify';

import {ApiLogger} from './common/logger';
import {Route} from './common/route';
import {HelloWorldRoute} from './routes/hello_world_route';
import { SquareRoute} from './routes/square_route';
import { ConfigServer } from './common/server';

class ApplicationBootstrap {
  private server: Server;
  constructor() {
    let logger = new ApiLogger();

    let loggerDetails = logger.createLogger();

    this.server = new ConfigServer().createServer(loggerDetails.get(ApiLogger.apiLoggerName),
    loggerDetails.get(ApiLogger.auditLoggerName));

    this.register(HelloWorldRoute);
    this.register(SquareRoute);
  }


  private register<T extends Route>(type:{ new(server): T; }): T{
      let route = new type(this.server);
      route.init();
      return route;
  }
}

export default new ApplicationBootstrap();
