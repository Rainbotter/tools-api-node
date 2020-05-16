import {Request, Response} from "express";
import {HEADERS} from "../config/constants.config";

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

    protected getIvApp(req: Request): string {
        return req.header(HEADERS.HEADER_IV_APP);
    }

    protected getIvAppId(req: Request): string {
        return req.header(HEADERS.HEADER_IV_APP_ID);
    }

    protected getIvOrg(req: Request): string {
        return req.header(HEADERS.HEADER_IV_ORG);
    }

    protected getIvOrgId(req: Request): string {
        return req.header(HEADERS.HEADER_IV_ORG_ID);
    }

    protected getIvUser(req: Request): string {
        return req.header(HEADERS.HEADER_IV_USER);
    }

    protected getIvGroups(req: Request): string[] {
        return req.header(HEADERS.HEADER_IV_GROUPS).replace(/\\/g, "").split(",");
    }

}
