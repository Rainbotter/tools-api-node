import mongoose = require("mongoose");
import {ConnectionOptions, Promise} from "mongoose";

export class Database {

    public connect(url: string, username: string, password: string, databaseName: string): Promise<void> {

        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            poolSize: 2,
            user: username,
            dbName: databaseName
        }

        const connectionUrl = "mongodb://" + url;

        console.info("Database config :");
        console.info(options);
        console.log("Database url : " + connectionUrl);

        options.pass = password;

        return mongoose.connect(connectionUrl, options)
            .then(value => {
                console.info("Database connection success");
                mongoose.connection.on('disconnected', args => console.error("### DATABASE DISCONNECTED"));
                mongoose.connection.on('connected', args => console.error("### RECONNECTED TO DATABASE"));
            })
            .catch(reason => {
                console.error("Database connection failure");
                console.error(reason);
                throw reason;
            });
    }

    public pingDatabase(): string {
        return mongoose.connection.db.databaseName;
    }

}
