import {injectable} from "tsyringe";
import {ProviderDto} from "../models/database/provider.dto";
import {ProviderResponse} from "../models/responses/provider.response";

@injectable()
export class ProvidersMapper {

    public mapDtoToResponse(dto: ProviderDto): ProviderResponse {
        return {
            code: dto.code,
            name: dto.name
        };
    }

}
