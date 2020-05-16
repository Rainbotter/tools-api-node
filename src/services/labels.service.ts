import {container, injectable} from "tsyringe";
import {getModelForClass} from "@typegoose/typegoose";
import {LabelDto} from "../models/database/label.dto";
import {MapReduceOptions} from "mongodb";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";

@injectable()
export class LabelsService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private labelModel = getModelForClass(LabelDto);

    public getLanguages(application: string): Promise<string[]> {

        const mapFunction = "function() { for (var key in this.translations) { emit(key, null); } }";
        const reduceFunction = "function(key, stuff) { return null; }";
        const options: MapReduceOptions = {
            out: {inline: 1},
            query: application ? {"applications": application} : null
        };

        return this.labelModel.collection
            .mapReduce(mapFunction, reduceFunction, options)
            .then(value => value.map(result => result._id));

    }

}
