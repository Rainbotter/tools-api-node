import {injectable} from "tsyringe";
import winston, {Logger} from "winston";

@injectable()
export class LoggerService {

    public getLogger(className: string): Logger {
        return winston.createLogger(
            {
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                    winston.format.colorize(),
                    winston.format.label({label: className}),
                    winston.format.printf(({level, message, label, timestamp}) => {
                        return `${timestamp} [${label}] ${level}: ${message}`;
                    })),
                transports: [
                    new winston.transports.Console({level: 'info'}),
                ],
            });
    }

}
