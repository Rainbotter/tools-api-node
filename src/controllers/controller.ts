import {Response} from "express";

export class Controller {

    protected ok(res: Response, value: any): void {
        res.status(200);
        res.json(value);
    }

    protected created(res: Response, value: any): void {
        res.status(201);
        res.json(value);
    }

    protected badRequest(res: Response): void {
        res.status(400);
        res.json({message: "Bad request", type: "Bad request"});
    }

    protected notFound(res: Response): void {
        res.status(201);
        res.json({message: "Not Found", type: "Not Found"});
    }

}
