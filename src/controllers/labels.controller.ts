import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {Controller} from "./controller";
import {LabelsService} from "../services/labels.service";
import {FindLanguagesParams} from "../models/requests/findLanguages.params";

@autoInjectable()
export class LabelsController extends Controller {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private labelsService: LabelsService = container.resolve(LabelsService);

    public getLanguages(req: Request, res: Response): void {
        const params: FindLanguagesParams = req.query as FindLanguagesParams;

        this.labelsService.getLanguages(params.applicationName)
            .then(result => this.ok(res, result));
    }

}
