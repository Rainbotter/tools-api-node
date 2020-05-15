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
                    {name: 'Used Memory', value: this.applicationInfoService.getUsedMemoryInMB()}
                ]
            }
        };

        this.ok(res, response);
    }

    public getPing(req: Request, res: Response): void {
        this.ok(res, {});
    }

    public getPingDb(req: Request, res: Response): void {
        this.databaseService.pingDatabase();
        this.ok(res, {});
    }

}
