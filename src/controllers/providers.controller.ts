import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {FindCountriesParams} from "../models/requests/findCountries.params";
import {ProvidersService} from "../services/providers.service";
import {ProvidersMapper} from "../mappers/providers.mapper";

@autoInjectable()
export class ProvidersController {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private providersService: ProvidersService = container.resolve(ProvidersService);
    private providerMapper: ProvidersMapper = container.resolve(ProvidersMapper);

    public find(req: Request, res: Response): void {
        const params: FindCountriesParams = req.query as FindCountriesParams;

        this.providersService.find("", "")
            .then(countries => res.json(countries.map(value => this.providerMapper.mapDtoToResponse(value))));
    }

}
