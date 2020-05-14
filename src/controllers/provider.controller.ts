import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {FindCountriesParams} from "../models/requests/findCountries.params";
import {ProvidersService} from "../services/providers.service";
import {ProviderMapper} from "../mappers/provider.mapper";

@autoInjectable()
export class ProviderController {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);
    private providersService: ProvidersService = container.resolve(ProvidersService);
    private providerMapper: ProviderMapper = container.resolve(ProviderMapper);

    public find(req: Request, res: Response): void {
        const params: FindCountriesParams = req.query as FindCountriesParams;

        this.providersService.find("", "")
            .then(countries => res.json(countries.map(value => this.providerMapper.mapDtoToResponse(value))));
    }

}
