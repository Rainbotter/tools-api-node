import {modelOptions, prop} from "@typegoose/typegoose";
import {COLLECTIONS} from "../../config/constants.config";

@modelOptions({schemaOptions: {collection: COLLECTIONS.APPLICATIONS_ACCESS_COLLECTION}})
export class ApplicationAccessDto {

    @prop()
    application: string;

    @prop()
    adGroups: string[];

}
