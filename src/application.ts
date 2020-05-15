import express from 'express';
import bodyParser from "body-parser";
import {Routes} from "./config/routes.config";
import {Database} from "./config/database.service";
import {DEFAULT_PORT} from "./config/constants.config";
import {Logger} from "winston";
import {container} from "tsyringe";
import {LoggerService} from "./services/logger.service";
import {Middlewares} from "./config/middlewares.config";

export class Application {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public database: Database = new Database();
    public middlewares: Middlewares = new Middlewares();

    private databaseHost: string = process.env.DB_HOST;
    private databaseUser: string = process.env.DB_USER;
    private databasePassword: string = process.env.DB_PASSWORD;
    private databaseName: string = process.env.DB_NAME;
    private appPort: string = process.env.PORT || DEFAULT_PORT;

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    constructor() {
        this.logger.info("App is starting");
        this.start()
            .then(() => this.logger.info("App is ready and listening on port " + this.appPort))
            .catch(() => {
                this.logger.error("App failed to start. Will try to properly shutdown");
                this.stop()
                    .then(() => this.logger.error("Shut down success"))
                    .catch(() => this.logger.error("Failed to stop properly"))
                    .finally(() => process.exit());
            });
    }

    private start(): Promise<void[]> {
        this.app = express();
        this.configureMiddlewares();

        const toDoAsynchronouslyOnLaunch = [
            this.database.connect(this.databaseHost, this.databaseUser, this.databasePassword, this.databaseName)
        ];

        return Promise.all(toDoAsynchronouslyOnLaunch);
    }

    private stop(): Promise<void[]> {
        const toDoAsynchronouslyOnStop = [
            this.database.disconnect()
        ];

        return Promise.all(toDoAsynchronouslyOnStop);
    }

    private configureMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(this.middlewares.logIncomingRequests());
        this.app.use(this.middlewares.handleUncaughtExceptions());
        this.routePrv.routes(this.app);
        this.app.use(this.middlewares.handleUnknowRoutes());
    }

}

export default new Application().app;
