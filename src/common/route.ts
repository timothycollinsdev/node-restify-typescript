import {Server} from "restify";
export interface Route {
    init(): void;
}