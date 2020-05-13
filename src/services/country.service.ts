import {container, injectable} from "tsyringe";
import {COLLECTIONS} from "../config/constants.config";
import {CountryDto} from "../models/database/country.dto";
import {getModelForClass} from "@typegoose/typegoose";
import {TranslationModel} from "../models/translation.model";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";

@injectable()
export class CountryService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private collection: string = COLLECTIONS.COUNTRIES_COLLECTION;
    private countryModel = getModelForClass(CountryDto);

    public getAll(): Promise<CountryDto[]> {
        return this.countryModel.find().exec();
    }

    public add(code: string, translations: TranslationModel[], codePhone: string, zipCodeRegex: string): Promise<void> {
        const objectToInsert: CountryDto = {
            code, codePhone, translations, zipCodeRegex
        };

        return this.countryModel.create(objectToInsert)
            .then(value => {
                console.log(value);
            })
            .catch(reason => console.log(reason));
    }

}
