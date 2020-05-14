import {Request, Response} from 'express';
import {autoInjectable, container} from "tsyringe";
import {ApplicationInfoService} from "../services/application-info.service";
import {InfoResponse} from "../models/responses/info.response";
import {Database} from "../config/database.service";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Controller} from "./controller";

@autoInjectable()
export class InfoController extends Controller {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);
    private applicationInfoService: ApplicationInfoService = container.resolve(ApplicationInfoService);
    private databaseService: Database = container.resolve(Database);

    public getInfo(req: Request, res: Response): void {

        const response: InfoResponse = {
            name: this.applicationInfoService.getApplicationName(),
            version: this.applicationInfoService.getApplicationVersion(),
            monitoring: {
                memory: [
                    {name: 'Used Memory', value: this.getUsedMemoryInMB()}
                ]
            }
        };

        this.ok(res, response);
    }

    public getPing(req: Request, res: Response): void {
        this.logger.info("ping");
        this.ok(res, {});
    }

    public getPingDb(req: Request, res: Response): void {
        this.logger.info("pingDb : " + this.databaseService.pingDatabase());
        this.ok(res, {});
    }

    private getUsedMemoryInMB(): string {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        return `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`;
    }

}
