import {stationStore} from "../models/station-store.js"
import {accountsController} from "./accounts-controller.js"
import {stationAnalytics} from "../utils/station-analytics.js"
import {reportStore} from "../models/report-store.js"

export const dashboardController = {
  async index(request, response) {
    
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);

    const viewData = {
      title: "Station Dashboard",
      stations: stations,
      
      
      
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addStation(request,response){
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      lat: request.body.lat,
      long:request.body.long,
      userId:loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
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
