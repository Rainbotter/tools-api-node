import {autoInjectable, container} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "../services/logger.service";
import {Request, Response} from "express";
import {HolidaysService} from "../services/holidays.service";
import {HolidaysMapper} from "../mappers/holidays.mapper";
import {FindHolidaysParams} from "../models/requests/findHolidays.params";
import {Controller} from "./controller";
import {Holiday} from "date-holidays";

@autoInjectable()
export class HolidaysController extends Controller {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private holidaysService: HolidaysService = container.resolve(HolidaysService);
    private holidaysMapper: HolidaysMapper = container.resolve(HolidaysMapper);

    public find(req: Request, res: Response): void {
        const params: FindHolidaysParams = req.query as FindHolidaysParams;

        if ((params.from && !params.to) || (params.minDays && !params.maxDays)) {
            this.badRequest(res);
            return;
        }

        let result: Holiday[] = [];

        if (params.to) {
            const to = new Date(params.to);
            if (params.from) {
                const from = new Date(params.from);
                result = this.holidaysService.findFromTo(from, to);
            } else {
                result = this.holidaysService.findTo(to);
            }
        } else if (params.maxDays) {
            const maxDays = parseInt(params.maxDays, 10);
            if (params.minDays) {
                const minDays = parseInt(params.minDays, 10);
                result = this.holidaysService.findMinMaxDays(minDays, maxDays);
            } else {
                result = this.holidaysService.findMaxDays(maxDays);
            }
        }

        this.ok(res, result.map(value => this.holidaysMapper.mapDtoToResponse(value)));

    }

}
