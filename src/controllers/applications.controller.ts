import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {FindCountriesParams} from "../models/requests/findCountries.params";
import {Controller} from "./controller";
import {ApplicationsService} from "../services/applications.service";
import {ApplicationsMapper} from "../mappers/applications.mapper";

@autoInjectable()
export class ApplicationsController extends Controller {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private applicationsService: ApplicationsService = container.resolve(ApplicationsService);
    private applicationsMapper: ApplicationsMapper = container.resolve(ApplicationsMapper);

    public getAllowedApplications(req: Request, res: Response): void {
        const params: FindCountriesParams = req.query as FindCountriesParams;

        this.applicationsService.getAllowedApplications(this.getIvGroups(req))
            .then(result => {
                if (result.length === 0) {
                    this.notFound(res);
                    return;
                }

                this.ok(res, this.applicationsMapper.mapDtoToResponse(result));
            });
    }

}
