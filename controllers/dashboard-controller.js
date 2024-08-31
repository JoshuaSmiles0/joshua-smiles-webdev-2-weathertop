import {stationStore} from "../models/station-store.js"
import {accountsController} from "./accounts-controller.js"
import {stationAnalytics} from "../utils/station-analytics.js"
import {reportStore} from "../models/report-store.js"
import axios from "axios"

export const dashboardController = {
  async index(request, response) {
    
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);
    const stationsSorted = stations.sort((a,b)=> a.title.localeCompare(b.title));
    const firstName = loggedInUser.firstName;
    const surname = loggedInUser.surname;
    const viewData = {
      title: "Station Dashboard",
      stations: stationsSorted,
      firstName: firstName,
      surname:surname,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addStation(request,response){
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const city = request.body.title;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=281db238f821b178adf62c53beda8f6c`;
    try {
  const result = await axios.get(requestUrl);
    const cityData = result.data;
    const newStation = {
      title: request.body.title,
      country:cityData.sys.country,
      lat: cityData.coord.lat,
      long:cityData.coord.lon,
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
      }
    
        catch(error)
      {
        console.log("Location does not exist")
        response.redirect("/dashboard")
      }
    
  },
  
  async deleteStation(request,response){
    const stationId = request.params.id;
    const reports = await reportStore.getReportsByStationId(stationId);
    console.log(`deleting station ${stationId} and associated reports`);
    for(let i = 0; i<reports.length;i++){
    let reportId = reports[i]._id;
    console.log(`report date ${reports[i].date}`)
    console.log(`deleting report ${reportId}`);
    await reportStore.deleteReport(reportId);
    };
    await stationStore.deleteStationById(stationId);
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
  const stationToUpdate = await stationStore.findStationById(stationId);
  await stationStore.updateStation(stationToUpdate,updatedStation);
  response.redirect("/station/" + stationId);
  
  
}
  
};
