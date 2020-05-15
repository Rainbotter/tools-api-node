import {Application, ErrorRequestHandler} from "express";
import {ErrorResponse} from "../models/responses/error.response";
import {Logger} from "winston";
import {container} from "tsyringe";
import {LoggerService} from "../services/logger.service";
import {App} from "../app";

export class ErrorHandlingConfig {

    private logger: Logger = container.resolve(LoggerService).getLogger(App.name);

    public errorHandling(application: Application): void {
        this.handleUncaughtExceptions(application);
        this.handleUnknowRoutes(application);
    }

    private handleUnknowRoutes(application: Application): void {

        application.route("*").get((req, res) => {

            const notFoundResponse: ErrorResponse = {
                type: "Not_FOUND",
                message: "The route doesn't exist"
            };

            res.status(404);
            res.json(notFoundResponse);
        });
    }

    private handleUncaughtExceptions(application: Application): void {
        const customInternalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

            const internalErrorResponse: ErrorResponse = {
                type: "INTERNAL_ERROR",
                message: "An internal error occured"
            };

            this.logger.error(err);

            res.status(err.status || 500);
            res.json(internalErrorResponse);
        };

        application.use(customInternalErrorHandler);
    }

}
