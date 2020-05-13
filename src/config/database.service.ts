import mongoose = require("mongoose");
import {ConnectionOptions, Promise} from "mongoose";
import {container} from "tsyringe";
import {LoggerService} from "../services/logger.service";
import {Logger} from "winston";

export class Database {

    private logger: Logger = container.resolve(LoggerService).getLogger(this.constructor.name);

    public connect(url: string, username: string, password: string, databaseName: string): Promise<void> {

        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            poolSize: 2,
            user: username,
            pass: password,
            dbName: databaseName
        }

        const connectionUrl = "mongodb://" + url;

        this.logger.info("Connecting to database on host " + url);

        return mongoose.connect(connectionUrl, options)
            .then(value => {
                this.logger.info("Database connection success");
                mongoose.connection.on('disconnected', args => this.logger.error("### DATABASE DISCONNECTED"));
                mongoose.connection.on('connected', args => this.logger.error("### RECONNECTED TO DATABASE"));
            })
            .catch(reason => {
                this.logger.error("Database connection failure");
                this.logger.error(reason);
                throw reason;
            });
    }

    public pingDatabase(): string {
        return mongoose.connection.db.databaseName;
    }

}
