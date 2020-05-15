import {ErrorRequestHandler, RequestHandler} from "express";
import {ErrorResponse} from "../models/responses/error.response";
import {Logger} from "winston";
import {container} from "tsyringe";
import {LoggerService} from "../services/logger.service";
import {Application} from "../application";

export class Middlewares {

    private logger: Logger = container.resolve(LoggerService).getLogger(Application.name);

    /**
     * This should be the last "app.use" in order to work properly
     */
    public handleUnknowRoutes(): RequestHandler {
        return (req, res) => {

            const notFoundResponse: ErrorResponse = {
                type: "NOT_FOUND",
                message: "The route doesn't exist"
            };

            this.logger.error(`${req.method} ${req.originalUrl} doesn't match any route`);

            res.status(404);
            res.json(notFoundResponse);
        };
    }

    public handleUncaughtExceptions(): ErrorRequestHandler {
        return (err, req, res, next) => {

            const internalErrorResponse: ErrorResponse = {
                type: "INTERNAL_ERROR",
                message: "An internal error occured"
            };

            this.logger.error(err);
            console.error(err);

            res.status(err.status || 500);
            res.json(internalErrorResponse);
        };
    }

    public logIncomingRequests(): RequestHandler {
        return (req, res, next) => {
            this.logger.info(`Incoming ${req.method} ${req.originalUrl}`);
            next();
        };
    }

}
