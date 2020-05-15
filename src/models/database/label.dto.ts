import {modelOptions, prop} from "@typegoose/typegoose";
import {COLLECTIONS} from "../../config/constants.config";

@modelOptions({schemaOptions: {collection: COLLECTIONS.LABELS_COLLECTION}})
export class LabelDto {

    @prop()
    code: string;

}
