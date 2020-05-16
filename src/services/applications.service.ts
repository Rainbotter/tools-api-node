import {container, injectable} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";
import {getModelForClass} from "@typegoose/typegoose";
import {ApplicationAccessDto} from "../models/database/application-access.dto";

@injectable()
export class ApplicationsService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private applicationModel = getModelForClass(ApplicationAccessDto);

    public getAllowedApplications(groups: string[]): Promise<ApplicationAccessDto[]> {
        return this.applicationModel.find().in("adGroups", groups).exec();
    }

}
