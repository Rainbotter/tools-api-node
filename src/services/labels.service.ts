import {injectable} from "tsyringe";
import {getModelForClass} from "@typegoose/typegoose";
import {LabelDto} from "../models/database/label.dto";
import {MapReduceOptions} from "mongodb";

@injectable()
export class LabelsService {

    private labelDto = getModelForClass(LabelDto);

    public getLanguages(application: string): Promise<string[]> {

        const mapFunction = "function() { for (var key in this.translations) { emit(key, null); } }";
        const reduceFunction = "function(key, stuff) { return null; }";
        const options: MapReduceOptions = {
            out: {inline: 1},
            query: application ? {"applications": application} : null
        };

        throw new Error("qsdf");

        return this.labelDto.collection
            .mapReduce(mapFunction, reduceFunction, options)
            .then(value => value.map(result => result._id));

    }

}
