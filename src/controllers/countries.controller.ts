import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {CountriesService} from "../services/countries.service";
import {Request, Response} from "express";
import {CountriesMapper} from "../mappers/countries.mapper";
import {FindCountriesParams} from "../models/requests/findCountries.params";

@autoInjectable()
export class CountriesController {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private countryService: CountriesService = container.resolve(CountriesService);
    private countryMapper: CountriesMapper = container.resolve(CountriesMapper);

    public find(req: Request, res: Response): void {
        const params: FindCountriesParams = req.query as FindCountriesParams;

        this.countryService.find(params.code, params.codePhone, params.name)
            .then(countries => res.json(countries.map(value => this.countryMapper.mapDtoToResponse(value))));
    }

}
