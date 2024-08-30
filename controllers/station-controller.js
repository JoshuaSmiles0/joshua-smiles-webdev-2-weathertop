import {stationStore} from "../models/station-store.js"
import {reportStore} from "../models/report-store.js"
import {stationAnalytics} from "../utils/station-analytics.js"
import axios from "axios"


export const stationController = 
{
  async index(request, response)
  {
    const station = await stationStore.getStationById(request.params.id);
    let tempTrend = [];
    let tempLabel = [];
    const reports = station.reports;
    for (let i = 0;i<station.reports.length;i++)
      {
        tempTrend.push(reports[i].temp);
        tempLabel.push(reports[i].date);
      }
    const viewData = {
      title:"station",
      station: station,
      tempTrend:tempTrend,
      tempLabel:tempLabel,
    };
    console.log(tempTrend)
    console.log(tempLabel)
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
  
async autogenerateReport(request,response){
  const station = await stationStore.findStationById(request.params.stationId);
  const date = new Date;
  const lat = station.lat;
  const long = station.long;
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=281db238f821b178adf62c53beda8f6c`;
  try {
  const result = await axios.get(requestUrl);
    const currentWeather = result.data;
    const newReport = {
      date: date.toISOString().replace('T',' ').replace('Z',' '),
      code: currentWeather.weather[0].id,
      temp: currentWeather.main.temp,
      windSpeed:currentWeather.wind.speed,
      windDirection:currentWeather.wind.deg,
      pressure: currentWeather.main.pressure,
    }
      console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/dashboard/updateStation/" + station._id);
  
    }
  
  catch (error){console.log("autoreading unsuccessufl");
    response.redirect("/station/" + station._id);}

  
},


async deleteReport (request,response){
  const stationId = (request.params.stationid);
  const reportId = (request.params.reportid);
  console.log(`deleting report ${reportId} from ${stationId}`);
  await reportStore.deleteReport(reportId);
  response.redirect("/dashboard/updateStation/" + stationId);
},
  
};