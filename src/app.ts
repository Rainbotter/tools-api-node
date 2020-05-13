import express from 'express';
import bodyParser from "body-parser";
import {Routes} from "./config/routes.config";
import {Database} from "./config/database.config";
import {DEFAULT_PORT} from "./config/constants.config";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public database: Database = new Database();

    private databaseHost: string = process.env.DB_HOST; // "localhost:27017"
    private databaseUser: string = process.env.DB_USER; // root
    private databasePassword: string = process.env.DB_PASSWORD; // example
    private databaseName: string = process.env.DB_NAME; // tools-api
    private appPort: string = process.env.PORT || DEFAULT_PORT;

    constructor() {
        console.info("# App is starting");
        this.start()
            .then(value => console.info("# App is ready and listening on port " + this.appPort))
            .catch(reason => {
                console.error("# App failed to start");
                process.exit();
            });
    }

    private start(): Promise<void> {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        return this.database.connect(this.databaseHost, this.databaseUser, this.databasePassword, this.databaseName);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }
}

export default new App().app;
