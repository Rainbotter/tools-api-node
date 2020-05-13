import {TranslationModel} from "../translation.model";

export interface CountryResponse {

    code: string;
    translations: TranslationModel[];
    codePhone: string;
    zipCodeRegex: string;

}
