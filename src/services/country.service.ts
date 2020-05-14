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

    private countryModel = getModelForClass(CountryDto);

    public getAll(): Promise<CountryDto[]> {
        return this.countryModel.find().exec();
    }

    public find(limit: string, first: string, code: string, codePhone: string, name: string): Promise<CountryDto[]> {
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
