import {injectable} from "tsyringe";

@injectable()
export class ApplicationInfoService {

    public getApplicationVersion(): string {
        return process.env.npm_package_version;
    }

    public getApplicationName(): string {
        return process.env.npm_package_name;
    }

    public getUsedMemoryInMB(): string {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        return `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`;
    }

}
