
import {Controller} from './common/controller';
import {HelloWorldController} from './controllers/hello_world';
import { SquareController} from './controllers/square';

import server from './common/server';
class ApplicationBootstrap {
  constructor() {
    this.bind(HelloWorldController);
    this.bind(SquareController);
  }


  private bind<T extends Controller>(type:{ new(server): T; }): T{
      return new type(server);
  }
}

export default new ApplicationBootstrap();
