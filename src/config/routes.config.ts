import {InfoController} from "../controllers/info.controller";

export class Routes {

    private infoController?: InfoController = new InfoController();

    public routes(app): void {
        app.route("/info").get((req, res) => this.infoController.getInfo(req, res));
    }

}
