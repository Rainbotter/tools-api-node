import {injectable} from "tsyringe";

@injectable()
export class ApplicationInfoService {

    public getApplicationVersion(): string {
        return process.env.npm_package_version;
    }

    public getApplicationName(): string {
        return process.env.npm_package_name;
    }

}
