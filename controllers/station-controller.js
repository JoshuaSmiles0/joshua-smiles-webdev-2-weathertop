import {stationStore} from "../models/station-store.js"
import {reportStore} from "../models/report-store.js"
import {stationAnalytics} from "../utils/station-analytics.js"


export const stationController = 
{
  async index(request, response)
  {
    const station = await stationStore.getStationById(request.params.id);
    // const weatherIcon = stationAnalytics.getWeatherIcon(station);
    // const weather = stationAnalytics.getLatestWeather(station);
    // const currentTemp = stationAnalytics.currentTemp(station);
    // const currentTempFarenheit = stationAnalytics.currentTempFarenheit(station)
    // const maxTemp = stationAnalytics.maxTemp(station);
    // const minTemp = stationAnalytics.minTemp(station);
    // const tempIconPath = stationAnalytics.tempIcon(station);
    // const currentWind = stationAnalytics.currentWind(station);
    // const currentWindMph = stationAnalytics.currentWindMph(station);
    // const maxWind = stationAnalytics.maxWind(station);
    // const minWind = stationAnalytics.minWind(station);
    // const windDirectionCompass = stationAnalytics.windDirection(station);
    // const windDirectionIcon = stationAnalytics.windDirectionIcon(station);
    // const windType = stationAnalytics.windType(station);
    // const currentPressure = stationAnalytics.currentPressure(station);
    // const maxPressure = stationAnalytics.maxPressure(station);
    // const minPressure = stationAnalytics.minPressure(station);
    // const windChill = stationAnalytics.calculateWindChill(station);
    const viewData = {
      title:"station",
      station: station,
      // weatherIcon:weatherIcon,
      // weather:weather,
      // currentTemp:currentTemp,
      // currentTempFarenheit:currentTempFarenheit,
      // maxTemp:maxTemp,
      // minTemp:minTemp,
      // tempIconPath:tempIconPath,
      // currentWind:currentWind,
      // currentWindMph:currentWindMph,
      // maxWind:maxWind,
      // minWind:minWind,
      // windDirectionCompass:windDirectionCompass,
      // windDirectionIcon:windDirectionIcon,
      // windType:windType,
      // currentPressure:currentPressure,
      // maxPressure:maxPressure,
      // minPressure:minPressure,
      // windChill:windChill,
    };
    
    response.render("station-view",viewData);
          
},
  
async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date;
    const newReport = {
      date: date.toISOString().replace('T',' ').replace('Z',' '),
      code: request.body.code,
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/dashboard/updateStation/" + station._id);
  },


async deleteReport (request,response){
  const stationId = (request.params.stationid);
  const reportId = (request.params.reportid);
  console.log(`deleting report ${reportId} from ${stationId}`);
  await reportStore.deleteReport(reportId);
  response.redirect("/station/" + stationId);
},
  
};