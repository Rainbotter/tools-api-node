import {container, injectable} from "tsyringe";
import {CountryDto} from "../models/database/country.dto";
import {getModelForClass} from "@typegoose/typegoose";
import {TranslationModel} from "../models/translation.model";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";

@injectable()
export class CountriesService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private countryModel = getModelForClass(CountryDto);

    public find(code: string, codePhone: string, name: string): Promise<CountryDto[]> {
        const query = this.countryModel.find();

        if (code) {
            query.where("code", code);
        }

        if (codePhone) {
            query.where("codePhone", codePhone);
        }

        if (name) {
            query.where("translations.name", name);
        }

        return query.exec();
    }

    public add(code: string, translations: TranslationModel[], codePhone: string, zipCodeRegex: string): Promise<CountryDto> {
        const objectToInsert: CountryDto = {
            code, codePhone, translations, zipCodeRegex
        };

        return this.countryModel.create(objectToInsert);
    }

}
