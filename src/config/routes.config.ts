import {InfoController} from "../controllers/info.controller";
import {container} from "tsyringe";

export class Routes {

    private infoController?: InfoController = container.resolve(InfoController);

    public routes(app): void {
        app.route("/info").get((req, res) => this.infoController.getInfo(req, res));
    }

}
