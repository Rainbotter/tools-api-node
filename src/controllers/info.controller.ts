import {Request, Response} from 'express';
import {autoInjectable, container} from "tsyringe";
import {ApplicationInfoService} from "../services/application-info.service";
import {InfoResponse} from "../models/responses/info.response";
import {Database} from "../config/database.service";

@autoInjectable()
export class InfoController {

    private applicationInfoService?: ApplicationInfoService = container.resolve(ApplicationInfoService);
    private databaseService?: Database = container.resolve(Database);

    public getInfo(req: Request, res: Response): void {


        const response: InfoResponse = {
            name: this.applicationInfoService.getApplicationName(),
            version: this.applicationInfoService.getApplicationVersion(),
            monitoring: {
                memory: [
                    {name: 'Used Memory', value: this.getUsedMemoryInMB()}
                ]
            }
        }

        res.json(response);
    }

    private getUsedMemoryInMB(): string {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        return `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`;
    }

    public getPing(req: Request, res: Response): void {
        res.json({});
    }

    public getPingDb(req: Request, res: Response): void {
        this.databaseService.pingDatabase();
        res.json({});
    }

}
