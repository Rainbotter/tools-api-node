import {injectable} from "tsyringe";
import {ApplicationAccessDto} from "../models/database/application-access.dto";
import {ApplicationResponse} from "../models/responses/application.response";

@injectable()
export class ApplicationsMapper {

    public mapDtoToResponse(dtos: ApplicationAccessDto[]): ApplicationResponse {
        return {applications: dtos.map(value => value.application)};
    }

}
