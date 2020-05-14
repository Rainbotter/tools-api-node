import {container, injectable} from "tsyringe";
import {Logger} from "winston";
import {LoggerService} from "./logger.service";
import Holidays, {Holiday} from "date-holidays";

@injectable()
export class HolidaysService {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    private hd = new Holidays("LU");

    public findFromTo(from: Date, to: Date): Holiday[] {
        let holidays: Holiday[] = [];

        console.log(from);
        console.log(to);

        let year = from.getFullYear();

        do {
            holidays = holidays.concat(this.hd.getHolidays(year));
            year++;
        } while (year <= to.getFullYear());

        return holidays.filter(value => value.start >= from && value.start <= to);
    }

    public findTo(to: Date): Holiday[] {
        return this.findFromTo(new Date(), to);
    }

    public findMinMaxDays(minDays: number, maxDays: number): Holiday[] {
        const from = new Date();
        from.setDate(from.getDate() + minDays);

        const to = new Date();
        to.setDate(to.getDate() + maxDays);

        return this.findFromTo(from, to);
    }

    public findMaxDays(maxDays: number): Holiday[] {
        const to = new Date();
        to.setDate(to.getDate() + maxDays);

        return this.findFromTo(new Date(), to);
    }

}
