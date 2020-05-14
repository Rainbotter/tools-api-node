import {InfoController} from "../controllers/info.controller";
import {container} from "tsyringe";
import {CountriesController} from "../controllers/countries.controller";
import {Application} from "express";
import {ProvidersController} from "../controllers/providers.controller";
import {HolidaysController} from "../controllers/holidays.controller";

export class Routes {

    private infoController: InfoController = container.resolve(InfoController);
    private countryController: CountriesController = container.resolve(CountriesController);
    private providerController: ProvidersController = container.resolve(ProvidersController);
    private holidaysController: HolidaysController = container.resolve(HolidaysController);

    public routes(app: Application): void {

        app.route("/info").get((req, res) => this.infoController.getInfo(req, res));
        app.route("/ping").get((req, res) => this.infoController.getPing(req, res));
        app.route("/pingDb").get((req, res) => this.infoController.getPingDb(req, res));

        app.route("/dictionaries/countries").get((req, res) => this.countryController.find(req, res));
        app.route("/dictionaries/providers").get((req, res) => this.providerController.find(req, res));
        app.route("/dictionaries/holidays").get((req, res) => this.holidaysController.find(req, res));

    }

}
