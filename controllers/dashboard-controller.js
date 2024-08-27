import {stationStore} from "../models/station-store.js"
import {accountsController} from "./accounts-controller.js"
import {stationAnalytics} from "../utils/station-analytics.js"
import {reportStore} from "../models/report-store.js"

export const dashboardController = {
  async index(request, response) {
    
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);
    const stationsSorted = stations.sort((a,b)=> a.title.localeCompare(b.title));
    

    const viewData = {
      title: "Station Dashboard",
      stations: stationsSorted,
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
      weatherIcon:null,
      weather:null,
      currentTemp:null,
      currentTempFarenheit:null,
      maxTemp:null,
      minTemp:null,
      tempIconPath:null,
      currentWind:null,
      currentWindMph:null,
      maxWind:null,
      minWind:null,
      windDirectionCompass:null,
      windDirectionIcon:null,
      windType:null,
      currentPressure:null,
      maxPressure:null,
      minPressure:null,
      windChill:null,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard")
  },
  
  async deleteStation(request,response){
    const stationId = request.params.id;
    console.log(`deleting station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    // await reportStore.deleteReportsByStationId(stationId);
    response.redirect("/dashboard");
  },
  
async updateStation(request,response){
  const stationId = request.params.stationId;
  console.log(`${stationId}`);
  const station = await stationStore.getStationById(stationId);
  const weatherIcon = stationAnalytics.getWeatherIcon(station);
    const weather = stationAnalytics.getLatestWeather(station);
    const currentTemp = stationAnalytics.currentTemp(station);
    const currentTempFarenheit = stationAnalytics.currentTempFarenheit(station)
    const maxTemp = stationAnalytics.maxTemp(station);
    const minTemp = stationAnalytics.minTemp(station);
    const tempIconPath = stationAnalytics.tempIcon(station);
    const currentWind = stationAnalytics.currentWind(station);
    const currentWindMph = stationAnalytics.currentWindMph(station);
    const maxWind = stationAnalytics.maxWind(station);
    const minWind = stationAnalytics.minWind(station);
    const windDirectionCompass = stationAnalytics.windDirection(station);
    const windDirectionIcon = stationAnalytics.windDirectionIcon(station);
    const windType = stationAnalytics.windType(station);
    const currentPressure = stationAnalytics.currentPressure(station);
    const maxPressure = stationAnalytics.maxPressure(station);
    const minPressure = stationAnalytics.minPressure(station);
    const windChill = stationAnalytics.calculateWindChill(station);
  const updatedStation = {
    weatherIcon:weatherIcon,
      weather:weather,
      currentTemp:currentTemp,
      currentTempFarenheit:currentTempFarenheit,
      maxTemp:maxTemp,
      minTemp:minTemp,
      tempIconPath:tempIconPath,
      currentWind:currentWind,
      currentWindMph:currentWindMph,
      maxWind:maxWind,
      minWind:minWind,
      windDirectionCompass:windDirectionCompass,
      windDirectionIcon:windDirectionIcon,
      windType:windType,
      currentPressure:currentPressure,
      maxPressure:maxPressure,
      minPressure:minPressure,
      windChill:windChill,
  }
  
  console.log(`updating station ${station.title}`);
  await stationStore.updateStation(station,updatedStation);
  response.redirect("/station/" + stationId);
  
  
}
  
};
