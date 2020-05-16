import {container, injectable} from "tsyringe";
import {getModelForClass} from "@typegoose/typegoose";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";
import {ProviderDto} from "../models/database/provider.dto";

@injectable()
export class ProvidersService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private providerModel = getModelForClass(ProviderDto);

    public find(code: string, name: string): Promise<ProviderDto[]> {
        const query = this.providerModel.find();

        if (code) {
            query.where("code", code);
        }

        if (name) {
            query.where("name", name);
        }

        return query.exec();
    }

    public add(name: string, code: string): Promise<ProviderDto> {
        const objectToInsert: ProviderDto = {
            name, code
        };

        return this.providerModel.create(objectToInsert);
    }

}
