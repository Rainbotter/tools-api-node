import {InfoController} from "../controllers/info.controller";
import {container} from "tsyringe";
import {CountryController} from "../controllers/country.controller";

export class Routes {

    private infoController: InfoController = container.resolve(InfoController);
    private countryController: CountryController = container.resolve(CountryController);

    public routes(app): void {

        app.route("/info").get((req, res) => this.infoController.getInfo(req, res));
        app.route("/ping").get((req, res) => this.infoController.getPing(req, res));
        app.route("/pingDb").get((req, res) => this.infoController.getPingDb(req, res));

        app.route("/dictionaries/countries").get((req, res) => this.countryController.getAll(req, res));

    }

}
