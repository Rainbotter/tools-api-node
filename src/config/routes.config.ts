import {InfoController} from "../controllers/info.controller";
import {container} from "tsyringe";

export class Routes {

    private infoController?: InfoController = container.resolve(InfoController);

    public routes(app): void {
        app.route("/").get(this.infoController.index);
    }

}