import "reflect-metadata";
import app from "./application";
import {DEFAULT_PORT} from "./config/constants.config";

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT);
