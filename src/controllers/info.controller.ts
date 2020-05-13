import {Request, Response} from 'express';
import {autoInjectable, container} from "tsyringe";
import {ApplicationInfoService} from "../services/application-info.service";
import {InfoResponse} from "../models/responses/info.response";

@autoInjectable()
export class InfoController {

    private applicationInfoService?: ApplicationInfoService = container.resolve(ApplicationInfoService);

    public getInfo(req: Request, res: Response): void {

        const response: InfoResponse = {
            name: this.applicationInfoService.getApplicationName(),
            version: this.applicationInfoService.getApplicationVersion()
        }
        
        res.json(response);
    }

}
