import express from 'express';
import bodyParser from "body-parser";
import {Routes} from "./config/routes.config";
import {Database} from "./config/database.service";
import {DEFAULT_PORT} from "./config/constants.config";
import {Logger} from "winston";
import {container} from "tsyringe";
import {LoggerService} from "./services/logger.service";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public database: Database = new Database();

    private databaseHost: string = process.env.DB_HOST;
    private databaseUser: string = process.env.DB_USER;
    private databasePassword: string = process.env.DB_PASSWORD;
    private databaseName: string = process.env.DB_NAME;
    private appPort: string = process.env.PORT || DEFAULT_PORT;

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    constructor() {
        this.logger.info("App is starting");
        this.start()
            .then(value => this.logger.info("# App is ready and listening on port " + this.appPort))
            .catch(reason => {
                this.logger.error("App failed to start");
                process.exit();
            });
    }

    private start(): Promise<void[]> {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        const toDoOnLunch = [
            this.initDB()
        ];
        return Promise.all(toDoOnLunch);
    }

    private initDB(): Promise<void> {
        return this.database.connect(this.databaseHost, this.databaseUser, this.databasePassword, this.databaseName);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }
}

export default new App().app;
