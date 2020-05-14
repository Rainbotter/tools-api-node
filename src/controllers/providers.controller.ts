import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {ProvidersService} from "../services/providers.service";
import {ProvidersMapper} from "../mappers/providers.mapper";
import {FindProvidersParams} from "../models/requests/findProviders.params";

@autoInjectable()
export class ProvidersController {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private providersService: ProvidersService = container.resolve(ProvidersService);
    private providerMapper: ProvidersMapper = container.resolve(ProvidersMapper);

    public find(req: Request, res: Response): void {
        const params: FindProvidersParams = req.query as FindProvidersParams;

        this.providersService.find(params.code, params.name)
            .then(countries => res.json(countries.map(value => this.providerMapper.mapDtoToResponse(value))));
    }

}
