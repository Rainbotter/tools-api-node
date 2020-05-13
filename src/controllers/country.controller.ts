import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {CountryService} from "../services/country.service";
import {Request, Response} from "express";
import {CountryMapper} from "../mappers/country.mapper";

@autoInjectable()
export class CountryController {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);
    private countryService: CountryService = container.resolve(CountryService);
    private countryMapper: CountryMapper = container.resolve(CountryMapper);

    public getAll(req: Request, res: Response): void {
        this.countryService.getAll()
            .then(countries => res.json(countries.map(value => this.countryMapper.mapDtoToResponse(value))));
    }

}
