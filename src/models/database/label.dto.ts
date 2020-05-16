import {modelOptions, prop} from "@typegoose/typegoose";
import {COLLECTIONS} from "../../config/constants.config";
import {TranslationModel} from "../translation.model";

@modelOptions({schemaOptions: {collection: COLLECTIONS.LABELS_COLLECTION}})
export class LabelDto {

    @prop()
    code: string;

    @prop()
    translations: TranslationModel[];

    @prop({alias: "update_date"})
    updateDate: string;

    @prop()
    applications: string[];

}
