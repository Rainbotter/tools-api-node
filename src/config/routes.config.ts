import {InfoController} from "../controllers/info.controller";
import {container} from "tsyringe";
import {CountryController} from "../controllers/country.controller";
import {Application} from "express";
import {ProviderController} from "../controllers/provider.controller";

export class Routes {

    private infoController: InfoController = container.resolve(InfoController);
    private countryController: CountryController = container.resolve(CountryController);
    private providerController: ProviderController = container.resolve(ProviderController);

    public routes(app: Application): void {

        app.route("/info").get((req, res) => this.infoController.getInfo(req, res));
        app.route("/ping").get((req, res) => this.infoController.getPing(req, res));
        app.route("/pingDb").get((req, res) => this.infoController.getPingDb(req, res));

        app.route("/dictionaries/countries").get((req, res) => this.countryController.find(req, res));
        app.route("/dictionaries/providers").get((req, res) => this.providerController.find(req, res));

    }

}
