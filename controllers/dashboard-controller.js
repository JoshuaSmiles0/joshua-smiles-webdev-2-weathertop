import {stationStore} from "../models/station-store.js"
import {accountsController} from "./accounts-controller.js"

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Station 1 Dashboard",
      stations: await stationStore.getStationByUserId(loggedInUser._id),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addStation(request,response){
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      userId:loggedInUser._id,
    };
    console.log(`adding playlist ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard")
  },
  
  async deleteStation(request,response){
    const stationId = request.params.id;
    console.log(`deleting station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
