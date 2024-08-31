import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";

export const dashboardController = {
  /*retrieves user object using cookies. Retrieves users stations by user object.userId. sorts user station array
  by comparing station.titles. Pulls first name and surname from user object. Renders dashboard view with users stations
  sorted, users first name and surname. 
  */
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);
    const stationsSorted = stations.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const firstName = loggedInUser.firstName;
    const surname = loggedInUser.surname;
    const viewData = {
      title: "Station Dashboard",
      stations: stationsSorted,
      firstName: firstName,
      surname: surname,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  /*triggered if invalid location added during addStation. retrieves same data as dashboardController.index but renders
  dashboard-view-invalid, containing error message on inputting non exisitng station in openweather api
  */
  async invalidLocation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);
    const stationsSorted = stations.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const firstName = loggedInUser.firstName;
    const surname = loggedInUser.surname;
    const viewData = {
      title: "Station Dashboard",
      stations: stationsSorted,
      firstName: firstName,
      surname: surname,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view-invalid", viewData);
  },

  /*triggered from routes when user adds station. retrieves logged in user object from cookies. retrieves city name from user input 
  city from input form. Makes Open weather API call using input city as parameter. Applies try/catch on API call. If API call successful
  creates cityData object from API call return. constructs newStation object with title from user input then country,lat and long from 
  API request object. All other features are set to null as these are populated when user adds reports to station. This object is then 
  added to stationStore. If API call unsuccessful redirects user to dashboardInvalid, triggering dashboardController.invalidLocation.
  */

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const city = request.body.title;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=281db238f821b178adf62c53beda8f6c`;
    try {
      const result = await axios.get(requestUrl);
      const cityData = result.data;
      const newStation = {
        title: request.body.title,
        country: cityData.sys.country,
        lat: cityData.coord.lat,
        long: cityData.coord.lon,
        userId: loggedInUser._id,
        weatherIcon: null,
        weather: null,
        currentTemp: null,
        currentTempFarenheit: null,
        maxTemp: null,
        minTemp: null,
        tempIconPath: null,
        currentWind: null,
        currentWindMph: null,
        maxWind: null,
        minWind: null,
        windDirectionCompass: null,
        windDirectionIcon: null,
        windType: null,
        currentPressure: null,
        maxPressure: null,
        minPressure: null,
        windChill: null,
      };
      console.log(`adding station ${newStation.title}`);
      await stationStore.addStation(newStation);
      response.redirect("/dashboard");
    } catch (error) {
      console.log("Location does not exist");
      response.redirect("/dashboardInvalid");
    }
  },

  /*takes stationId from URL parameters. retrieves reports for station from reportStore using stationId. Iterates over 
  reports using for loop, deleting each report from reportStore using reportid in retrieved reports. Then deletes station
  from stationStore using stationId. Redirects User to dashboard via the route.
  */

  async deleteStation(request, response) {
    const stationId = request.params.id;
    const reports = await reportStore.getReportsByStationId(stationId);
    console.log(`deleting station ${stationId} and associated reports`);
    for (let i = 0; i < reports.length; i++) {
      let reportId = reports[i]._id;
      console.log(`report date ${reports[i].date}`);
      console.log(`deleting report ${reportId}`);
      await reportStore.deleteReport(reportId);
    }
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },

  /*designed to be triggered whenever a user adds or deletes a report to a station. Retrieves stationId from URL params. Retrieves 
  reports associated with station from stationStore using stationId. sets previously null or populated values on station using util 
  methods from stationAnalytics then creates updatedStation object from these. retrieves station from stationStore using find station
  then calls updateStation method in stationStore using updatedStation and retrieved station to update station details. redirects user
  to station page for station.
  */

  async updateStation(request, response) {
    const stationId = request.params.stationId;
    console.log(`${stationId}`);
    const station = await stationStore.getStationById(stationId);
    const weatherIcon = stationAnalytics.getWeatherIcon(station);
    const weather = stationAnalytics.getLatestWeather(station);
    const currentTemp = stationAnalytics.currentTemp(station);
    const currentTempFarenheit = stationAnalytics.currentTempFarenheit(station);
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
      weatherIcon: weatherIcon,
      weather: weather,
      currentTemp: currentTemp,
      currentTempFarenheit: currentTempFarenheit,
      maxTemp: maxTemp,
      minTemp: minTemp,
      tempIconPath: tempIconPath,
      currentWind: currentWind,
      currentWindMph: currentWindMph,
      maxWind: maxWind,
      minWind: minWind,
      windDirectionCompass: windDirectionCompass,
      windDirectionIcon: windDirectionIcon,
      windType: windType,
      currentPressure: currentPressure,
      maxPressure: maxPressure,
      minPressure: minPressure,
      windChill: windChill,
    };

    console.log(`updating station ${station.title}`);
    const stationToUpdate = await stationStore.findStationById(stationId);
    await stationStore.updateStation(stationToUpdate, updatedStation);
    response.redirect("/station/" + stationId);
  },
};
