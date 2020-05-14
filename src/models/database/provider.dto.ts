import {modelOptions, prop} from "@typegoose/typegoose";
import {COLLECTIONS} from "../../config/constants.config";

@modelOptions({schemaOptions: {collection: COLLECTIONS.PROVIDERS_COLLECTION}})
export class ProviderDto {

    @prop()
    code: string;

    @prop()
    name: string;

}
