import {injectable} from "tsyringe";
import {HolidayResponse} from "../models/responses/holiday.response";
import {Holiday} from "date-holidays";

@injectable()
export class HolidaysMapper {

    public mapDtoToResponse(dto: Holiday): HolidayResponse {
        return {
            date: dto.date,
            description: dto.name,
            propertiesKey: "",
            type: dto.type
        };
    }

}
