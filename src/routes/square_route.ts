import { Route } from '../common/route';
import {Server} from "restify";


export class SquareRoute implements Route{
    private server: Server;

    constructor(server: Server) {
        this.server = server;
    }

    public init(): void {
        
        this.server.get({ path: '/square/:number', name: 'S' }, repo.square);
        
    }
}


export class Repo