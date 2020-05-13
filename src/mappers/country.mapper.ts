import {injectable} from "tsyringe";
import {CountryDto} from "../models/database/country.dto";
import {CountryResponse} from "../models/responses/country.response";

@injectable()
export class CountryMapper {

    public mapDtoToResponse(dto: CountryDto): CountryResponse {
        return {
            code: dto.code,
            codePhone: dto.codePhone,
            translations: dto.translations,
            zipCodeRegex: dto.zipCodeRegex
        };
    }

}
