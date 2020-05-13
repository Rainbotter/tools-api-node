import {modelOptions, prop} from "@typegoose/typegoose";
import {TranslationModel} from "../translation.model";
import {COLLECTIONS} from "../../config/constants.config";

@modelOptions({schemaOptions: {collection: COLLECTIONS.COUNTRIES_COLLECTION}})
export class CountryDto {

    @prop()
    code: string;

    @prop()
    translations: TranslationModel[];

    @prop()
    codePhone: string;

    @prop()
    zipCodeRegex: string;

}
