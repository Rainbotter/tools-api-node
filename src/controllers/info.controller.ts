import {Request, Response} from 'express';
import {injectable} from "tsyringe";

@injectable()
export class InfoController {

    public index(req: Request, res: Response) {
        res.json({
            message: "hello world"
        });
    }

}